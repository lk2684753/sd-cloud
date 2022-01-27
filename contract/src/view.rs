use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::json_types::U128;
use near_sdk::serde::{Deserialize, Serialize};

use crate::*;
use crate::did::Document;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct ViewInfo {
    pub holder: String,
    pub document: Document,
    pub files_num: usize,
    pub files_all_size: f64,
    pub file_folders: Vec<String>,
    pub account: Account,
}

impl ViewInfo {
    pub fn new_default(holder: String,
                       document: Document,
                       files_num: usize, files_all_size: f64,
                       file_folders: Vec<String>,
                       account: Account,
    ) -> Self {
        ViewInfo {
            holder,
            document,
            files_num,
            files_all_size,
            file_folders,
            account,
        }
    }
}


#[near_bindgen]
impl Contract {
    ///view
    ///
    ///this method looks at all the stored information for the DID owner
    ///
    ///return StoreInfo  todo retrun json StoreInfo
    pub fn view_account(&self, did: String) -> Option<String> {
        let mut files_all_size = self.files_all_size.get(&did).unwrap_or(0.0);
        let files_num = self.files_store.get(&did).unwrap_or(vec![]).len();
        if files_num == 0 {
            files_all_size = 0.0;
        }

        let result = ViewInfo::new_default(
            did.clone(),
            self.get_document(did.clone()),
            self.files_store.get(&did).unwrap_or(vec![]).len(),
            files_all_size,
            self.folder_view(did.clone()),
            self.account.get(&did).unwrap_or(Account::new_default()),
        );
        Some(serde_json::to_string(&result).unwrap_or("".to_string()))
    }

    pub fn view_all_files(
        &self,
        did: String,
        from_index: Option<U128>,
        limit: Option<u64>)
        -> Option<String> {
        let start_index: u128 = from_index.map(From::from).unwrap_or_default();
        let limit = limit.map(|v| v as usize).unwrap_or(usize::MAX);
        let mut files = vec![];
        let _result = self.files_store.get(&did).unwrap_or(vec![]).iter().rev()
            .skip(start_index as usize)
            .take(limit)
            .map(|sid| {
                let file = self.file_index.get(sid).unwrap();
                files.push(file);
            }).collect::<Vec<_>>();

        Some(serde_json::to_string(&files).unwrap_or("".to_string()))
    }

    ///view_files_in_folder
    ///
    /// query all files in a folder
    pub fn view_files_in_folder(
        &self,
        did: String,
        folder: String, from_index: Option<U128>,
        limit: Option<u64>,
    )
        -> Option<String> {
        let files = self.files_view(did.clone());
        let start_index: u128 = from_index.map(From::from).unwrap_or_default();
        let limit = limit.map(|v| v as usize).unwrap_or(usize::MAX);

        let result = files.iter()
            .filter(|f| f.file_folder.contains(&folder))
            .skip(start_index as usize)
            .take(limit)
            .collect::<Vec<_>>();

        Some(serde_json::to_string(&result).unwrap_or("".to_string()))
    }

    ///view_file_exist
    ///
    /// check whether the file exists
    pub fn view_file_exist(&self, did: String, cid: String) -> bool {
        self.files_store.get(&did).unwrap_or(vec![]).contains(&cid)
    }

    ///view_account_token
    pub fn view_account_token(&self) -> String {
        self.account_token.get(&String::from("api")).unwrap()
    }

    pub(crate) fn files_view(&self, did: String) -> Vec<File> {
        let mut files = vec![];
        let sids = self.files_store.get(&did).unwrap_or(vec![]);
        for s in sids.into_iter() {
            let file = self.file_index.get(&s).expect("files_view: no files!");
            files.push(file);
        }
        files
    }

    pub(crate) fn folder_view(&self, did: String) -> Vec<String> {
        self.folder_store.get(&did).unwrap_or(vec![])
    }
}