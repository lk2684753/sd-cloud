use crate::*;
use near_sdk::{env, near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};

const FOLDER_PICTURE: &'static str = "picture";
const FOLDER_MUSIC: &'static str = "music";
const FOLDER_VIDEO: &'static str = "video";
const FOLDER_DOCUMENT: &'static str = "document";
const FOLDER_OTHER: &'static str = "other";

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct File {
    pub holder: String,
    pub cid: String,
    pub file_name: String,
    pub file_type: String,
    pub file_size: f64,
    pub file_folder: Vec<String>,
    pub created: u64,
    pub network_id: u64,
}

impl File {
    pub fn new_default(holder: String,cid: String, file_name: String, file_type: String, file_size: f64, file_folder: Vec<String>, created: u64,network_id: u64) -> Self {
        File {
            holder,
            cid,
            file_name,
            file_type,
            file_size,
            file_folder,
            created,
            network_id,
        }
    }
}

#[near_bindgen]
impl Contract {
    ///call

    ///file_store
    ///
    ///this method adds the relevant file information
    pub fn store(&mut self, cid: String, file_name: String, file_type: String, file_size: f64, file_owner_folder: Vec<String>,network_id:u64) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);
        self.check_file(&cid, &did);
        let file_folder = self.check_folder(&did, file_owner_folder);

        let f = File::new_default(
            did.clone(),
            cid.clone(),
            file_name, file_type,
            file_size.clone(),
            file_folder,
            env::block_timestamp(),
          network_id
        );

        self.file_index.insert(&cid, &f);
        self.files_store(cid.clone(), &did);
        self.update_file_all_size(&did, file_size);
        self.updated.insert(&did, &env::block_timestamp());
        env::log_str(&format!("file_store, did:{}, cid : {}", &did, &cid));
        true
    }

    ///file_delete
    ///
    ///this method will delete file record
    pub fn file_delete(&mut self, cid: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let file_status = self.files_store.get(&did).unwrap_or(vec![]);
        if !file_status.contains(&cid) {
            env::panic_str("store, file not exists");
        };

        let size = self.file_index.get(&cid).unwrap().file_size;

        self.file_index.remove(&cid);

        let mut files = self.files_store.get(&did).unwrap();
        let index = files
            .iter()
            .position(|x| x == &cid)
            .unwrap();
        files.get(index);
        files.remove(index);
        self.files_store.insert(&did, &files);

        let mut s = self.files_all_size.get(&did).unwrap_or(0 as f64);
        s -= size;
        self.files_all_size.insert(&did, &s);

        self.updated.insert(&did, &env::block_timestamp());
        env::log_str(&format!("file_store, did:{}, cid : {}", &did, &cid));
        true
    }

    ///files_delete
    ///
    ///this method will delete more files record
    pub fn files_delete(&mut self, cids: Vec<String>) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);
        self.check_store_service(&did);

        let mut files = self.files_store.get(&did).unwrap();
        let mut s = self.files_all_size.get(&did).unwrap_or(0 as f64);
        for cid in cids {
            let size = self.file_index.get(&cid).unwrap().file_size;
            self.file_index.remove(&cid);
            files.retain(|x| x != &cid);
            s -= size;
        }
        self.files_store.insert(&did, &files);
        self.updated.insert(&did, &env::block_timestamp());
        self.files_all_size.insert(&did, &s);
        true
    }

    ///folder_create
    ///
    ///this method will create a new folder
    pub fn folder_create(&mut self, folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let mut folders = self.folder_store.get(&did).unwrap_or(vec![]);
        if folders.contains(&folder) {
            env::panic_str("folder_create, folder exists");
        };
        folders.push(folder.clone());
        self.folder_store.insert(&did, &folders);
        self.updated.insert(&did, &env::block_timestamp());
        env::log_str(&format!("folder_create, did:{}, folder : {}", &did, &folder));
        true
    }

    ///folder_rename
    ///
    ///1.delete folder
    ///2.create folder
    ///3.copy the previous folder information
    ///4.Delete previous folder information
    ///this method will rename the folder
    ///if the folder is renamed, all the files in the current folder will be changed based on the folder as the key
    pub fn folder_rename(&mut self, pre_folder: String, folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let _result = self.files_store.get(&did).unwrap_or(vec![]).iter()
            .map(|cid| {
                let mut file = self.file_index.get(cid).expect("no files");
                if file.file_folder.contains(&pre_folder) {
                    file.file_folder.retain(|x| x != &pre_folder);
                    file.file_folder.push(folder.clone());
                    self.file_index.insert(&file.cid, &file);
                }
            }).collect::<Vec<_>>();

        let mut folders = self.folder_store.get(&did).unwrap();
        let index = folders
            .iter()
            .position(|x| x == &pre_folder)
            .unwrap();
        folders.remove(index);
        folders.push(folder.clone());
        self.folder_store.insert(&did, &folders);
        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///folder_delete
    ///
    ///this method will delete a new folder
    pub fn folder_delete(&mut self, folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let mut folders = self.folder_store.get(&did).unwrap();
        if !folders.contains(&folder) {
            env::panic_str("folder_delete, folder not exists");
        };

        let cids = self.files_store.get(&did).unwrap_or(vec![]);
        for cid in cids {
            let file = self.file_index.get(&cid);
            for mut f in file {
                f.file_folder.retain(|x| x != &folder);
                self.file_index.insert(&cid, &f);
            }
        }

        folders.retain(|x| x != &folder);
        self.folder_store.insert(&did, &folders);
        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///file_copy_to_folder
    ///
    ///this method moves and copies the file to another folder
    pub fn file_copy_to_folder(&mut self, cid: String, folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let file = self.file_index.get(&cid);
        let folders = self.folder_store.get(&did).unwrap();
        if !folders.contains(&folder) {
            env::panic_str("folder_delete, folder not exists");
        };

        for mut f in file {
            if !f.file_folder.contains(&folder) {
                f.file_folder.push(folder.clone());
                self.file_index.insert(&cid, &f);
            }
        }
        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///file_delete_in_folder
    ///
    ///this method will delete the files in the folder
    pub fn file_delete_in_folder(&mut self, cid: String, folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let file = self.file_index.get(&cid);

        let folders = self.folder_store.get(&did).unwrap();
        if !folders.contains(&folder) {
            env::panic_str("folder_delete, folder not exists");
        };

        for mut f in file {
            f.file_folder.retain(|x| x != &folder);
            self.file_index.insert(&cid, &f);
        }
        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///files_delete_in_folder
    ///
    ///this method will delete the more files in the folder
    pub fn files_delete_in_folder(&mut self, cids: Vec<String>, folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let _result: Vec<_> = cids.iter().map(|cid| {
            let file = self.file_index.get(&cid);
            for mut f in file {
                f.file_folder.retain(|x| x != &folder);
                self.file_index.insert(&cid, &f);
            }
        }).collect();

        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///file_move_in_folder
    ///
    ///this method will moves files from one folder to another
    pub fn file_move_in_folder(&mut self, cid: String, from_folder: String, to_folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let file = self.file_index.get(&cid);

        let folders = self.folder_store.get(&did).unwrap();
        if !folders.contains(&from_folder) {
            env::panic_str("folder_delete, folder not exists");
        };

        for mut f in file {
            f.file_folder.retain(|x| x != &from_folder);
            f.file_folder.push(to_folder.clone());
            self.file_index.insert(&cid, &f);
        }
        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    pub fn files_move_in_folder(&mut self, cids: Vec<String>, from_folder: String, to_folder: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        self.check_store_service(&did);

        let folders = self.folder_store.get(&did).unwrap();
        if !folders.contains(&from_folder) {
            env::panic_str("folder_delete, folder not exists");
        };

        for cid in cids {
            let file = self.file_index.get(&cid);
            for mut f in file {
                f.file_folder.retain(|x| x != &from_folder);
                f.file_folder.push(to_folder.clone());
                self.file_index.insert(&cid, &f);
            }
        }

        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///file_rename
    ///
    pub fn file_rename(&mut self, cid: String, rename: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);
        self.check_store_service(&did);
        let mut file = self.file_index.get(&cid).unwrap();
        file.file_name = rename;
        self.file_index.insert(&cid, &file);
        self.updated.insert(&did, &env::block_timestamp());
        true
    }

    ///check_file
    ///
    fn check_file(&self, cid: &String, did: &String) {
        let file_status = self.files_store.get(did).unwrap_or(vec![]);
        if file_status.contains(cid) {
            env::panic_str("store, file exists");
        };
    }

    ///check_folder
    ///
    fn check_folder(&self, did: &String, folder: Vec<String>) -> Vec<String> {
        let mut file_folder = vec![];
        if folder.len() == 0 {
            return file_folder;
        }

        let folders = self.folder_store.get(did).unwrap_or(vec![]);
        for f in folder {
            if !folders.contains(&f) {
                env::panic_str("check_folder, folder not exists");
            };
            file_folder.push(f)
        }

        file_folder
    }

    ///files_store
    ///
    fn files_store(&mut self, cid: String, did: &String) {
        let mut s = self.files_store.get(did).unwrap_or(vec![]);
        s.push(cid);
        self.files_store.insert(did, &s);
    }

    ///update_file_all_size
    ///
    ///this method updates the total file size of the all file
    fn update_file_all_size(&mut self, did: &String, size: f64) {
        let mut s = self.files_all_size.get(did).unwrap_or(0 as f64);
        s += size;
        self.files_all_size.insert(&did, &s);
    }

    pub fn default_folder(&mut self, did: &String) {
        let mut folders = vec![];
        folders.push(FOLDER_PICTURE.to_string());
        folders.push(FOLDER_MUSIC.to_string());
        folders.push(FOLDER_VIDEO.to_string());
        folders.push(FOLDER_DOCUMENT.to_string());
        folders.push(FOLDER_OTHER.to_string());
        self.folder_store.insert(did, &folders);
        self.updated.insert(&did, &env::block_timestamp());
    }
}

