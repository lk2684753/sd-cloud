use near_sdk::{AccountId,near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedMap;
use crate::did::{PublicKeyList, Service};
use crate::file::File;
use crate::account::Account;

mod did;
mod file;
mod account;
mod view;

#[derive(BorshDeserialize, BorshSerialize)]
pub enum Status {
    VALID = 0x00,
    DEACTIVATED = 0x01,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize)]
pub struct Contract {
    /// Status is used to store the state of DID. There are two states of DID, valid and invalid.
    pub status: UnorderedMap<String, Status>,
    /// context.
    pub contexts: UnorderedMap<String, Vec<String>>,
    /// It is used to store all public key information corresponding to this DID
    pub public_key: UnorderedMap<String, PublicKeyList>,
    pub authentication: UnorderedMap<String, Vec<u32>>,

    /// It is used to store all controller information corresponding to this DID. The controller has the authority to update the information of this did.
    pub controller: UnorderedMap<String, Vec<String>>,
    pub service: UnorderedMap<String, Vec<Service>>,
    /// Used to store the creation time of DID
    pub created: UnorderedMap<String, u64>,
    /// Used to store the update time of DID
    pub updated: UnorderedMap<String, u64>,

    //pub files: UnorderedMap<String, Vec<File>>,
    ///This is a record of the information stored in the file. key:did; value:vec<String>
    pub files_store: UnorderedMap<String, Vec<String>>,
    ///This is the folder that records the user's ownership. key:did; value:vec<folder_name>
    pub folder_store: UnorderedMap<String, Vec<String>>,
    ///This is all the files contained in the records folder. key:did+folder_name; value:File
    pub file_index: UnorderedMap<String, File>,
    ///This method records the total file storage size.  key:did; value:f64
    pub files_all_size: UnorderedMap<String, f64>,

    ///This is to store the user's profile picture information. key:did; value:cid(image)
    pub account: UnorderedMap<String, Account>,
    ///This is the token used for user API calls. key:did; value:token
    pub account_token: UnorderedMap<String, String>,
}

impl Default for Contract {
    fn default() -> Self {
        Self {
            status: UnorderedMap::new(b"r".to_vec()),
            contexts: UnorderedMap::new(b"c".to_vec()),
            public_key: UnorderedMap::new(b"k".to_vec()),
            authentication: UnorderedMap::new(b"w".to_vec()),
            controller: UnorderedMap::new(b"a".to_vec()),
            service: UnorderedMap::new(b"d".to_vec()),
            created: UnorderedMap::new(b"j".to_vec()),
            updated: UnorderedMap::new(b"h".to_vec()),
            files_store: UnorderedMap::new(b"f".to_vec()),
            folder_store: UnorderedMap::new(b"e".to_vec()),
            file_index: UnorderedMap::new(b"i".to_vec()),
            files_all_size: UnorderedMap::new(b"l".to_vec()),
            account: UnorderedMap::new(b"g".to_vec()),
            account_token:UnorderedMap::new(b"t".to_vec()),
        }
    }
}

pub fn gen_did(account_id: AccountId) -> String {
    String::from("did:near:") + account_id.as_str()
}
