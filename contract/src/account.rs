use near_sdk::{env, near_bindgen};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::serde::{Deserialize, Serialize};

use crate::*;

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize)]
pub struct Account {
    pub account_name: String,
    pub account_images_name: String,
    pub account_images: String,
    pub account_api_token: String,
    pub account_custom_node:String,
    pub account_custom_node_name:String
}

impl Account {
    pub fn new_default() -> Self {
        Self {
            account_name: String::new(),
            account_images_name: String::new(),
            account_images: String::new(),
            account_api_token: String::new(),
            account_custom_node: String::new(),
            account_custom_node_name: String::new(),
        }
    }
}

#[near_bindgen]
impl Contract {
    ///save_account_image
    ///
    /// This method will save the user's avatar information in IPFS
    pub fn save_account_image(&mut self, name: String, cid: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        let mut account = self.account.get(&did).unwrap_or(Account::new_default());
        account.account_images_name = name;
        account.account_images = cid;
        self.account.insert(&did, &account);
        true
    }

    pub fn save_account_name(&mut self, name: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        let mut account = self.account.get(&did).unwrap_or(Account::new_default());
        account.account_name = name;
        self.account.insert(&did, &account);
        true
    }

    pub fn save_account_api_token(&mut self, token: String) -> bool {
        let account_id = env::signer_account_id();
        let did = gen_did(account_id);

        let mut account = self.account.get(&did).unwrap_or(Account::new_default());
        account.account_api_token = token;
        self.account.insert(&did, &account);
        true
    }

    //Token used by default
    pub fn account_token(&mut self, token: String) -> bool {
        let api = String::from("api");
        self.account_token.insert(&api, &token);
        true
    }

    pub fn save_account_custom_node(&mut self, custom_node: String,node_name:String) -> bool {
       let account_id = env::signer_account_id();
       let did = gen_did(account_id);

       let mut account = self.account.get(&did).unwrap_or(Account::new_default());
       account.account_custom_node = custom_node;
       account.account_custom_node_name= node_name;
       self.account.insert(&did, &account);
       true
    }
}
