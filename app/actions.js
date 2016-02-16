const UNLOCK_METAMASK = 'UNLOCK_METAMASK'
const UNLOCK_IN_PROGRESS = 'UNLOCK_IN_PROGRESS'
const UNLOCK_FAILED = 'UNLOCK_FAILED'
const UPDATE_METAMASK_STATE = 'UPDATE_METAMASK_STATE'
const LOCK_METAMASK = 'LOCK_METAMASK'
const SET_SELECTED_ACCOUNT = 'SET_SELECTED_ACCOUNT'
const SHOW_ACCOUNT_DETAIL = 'SHOW_ACCOUNT_DETAIL'
const SHOW_ACCOUNTS_PAGE = 'SHOW_ACCOUNTS_PAGE'
const SHOW_CONF_TX_PAGE = 'SHOW_CONF_TX_PAGE'
const SHOW_CREATE_VAULT = 'SHOW_CREATE_VAULT'
const SHOW_RESTORE_VAULT = 'SHOW_RESTORE_VAULT'
const SHOW_INIT_MENU = 'SHOW_INIT_MENU'

module.exports = {
  // remote state
  UPDATE_METAMASK_STATE: UPDATE_METAMASK_STATE,
  updateMetamaskState: updateMetamaskState,
  // intialize screen
  SHOW_CREATE_VAULT: SHOW_CREATE_VAULT,
  SHOW_RESTORE_VAULT: SHOW_RESTORE_VAULT,
  SHOW_INIT_MENU: SHOW_INIT_MENU,
  showCreateVault: showCreateVault,
  showRestoreVault: showRestoreVault,
  showInitializeMenu: showInitializeMenu,
  // unlock screen
  UNLOCK_IN_PROGRESS: UNLOCK_IN_PROGRESS,
  UNLOCK_FAILED: UNLOCK_FAILED,
  UNLOCK_METAMASK: UNLOCK_METAMASK,
  LOCK_METAMASK: LOCK_METAMASK,
  tryUnlockMetamask: tryUnlockMetamask,
  lockMetamask: lockMetamask,
  // accounts screen
  SET_SELECTED_ACCOUNT: SET_SELECTED_ACCOUNT,
  SHOW_ACCOUNT_DETAIL: SHOW_ACCOUNT_DETAIL,
  SHOW_ACCOUNTS_PAGE: SHOW_ACCOUNTS_PAGE,
  SHOW_CONF_TX_PAGE: SHOW_CONF_TX_PAGE,
  setSelectedAddress: setSelectedAddress,
  sendTx: sendTx,
  signTx: signTx,
  cancelTx: cancelTx,  
  // app messages
  showAccountDetail: showAccountDetail,
  showAccountsPage: showAccountsPage,
  showConfTxPage: showConfTxPage,
  // hacky - need a way to get a reference to account manager
  _setAccountManager: _setAccountManager,
}


var _accountManager = null
function _setAccountManager(accountManager){
  _accountManager = accountManager
}

// async actions

function tryUnlockMetamask(password) {
  return function(dispatch) {
    dispatch(unlockInProgress())
    _accountManager.submitPassword(password, function(err){
      if (err) {
        dispatch(unlockFailed())
      } else {
        dispatch(unlockMetamask())
      }
    })
  }
}

function setSelectedAddress(address) {
  return function(dispatch) {
    _accountManager.setSelectedAddress(address)
  }
}

function signTx(password, txData){
  return function(dispatch) {
    _accountManager.signTransaction(password, txData.id, function(err){
      if (err) return console.error(err.message)
      // dispatch(showAccountsPage())
    })
  }
}

function sendTx(txData){
  return function(dispatch) {
    _accountManager.sendTransaction(txData.id, function(err){
      if (err) return console.error(err.message)
      dispatch(showAccountsPage())
    })
  }
}

function cancelTx(txData){
  return function(dispatch) {
    _accountManager.cancelTransaction(txData.id)
    dispatch(showAccountsPage())
  }
}

//
// initialize screen
//


function showCreateVault() {
  return {
    type: SHOW_CREATE_VAULT,
  }
}

function showRestoreVault() {
  return {
    type: SHOW_RESTORE_VAULT,
  }
}

function showInitializeMenu() {
  return {
    type: SHOW_INIT_MENU,
  }
}

//
// unlock screen
//

function unlockInProgress() {
  return {
    type: UNLOCK_IN_PROGRESS,
  }
}

function unlockFailed() {
  return {
    type: UNLOCK_FAILED,
  }
}

function unlockMetamask() {
  return {
    type: UNLOCK_METAMASK,
  }
}

function updateMetamaskState(newState) {
  return {
    type: UPDATE_METAMASK_STATE,
    value: newState,
  }
}

function lockMetamask() {
  _accountManager.setLocked()
  return {
    type: LOCK_METAMASK,
  }
}

function showAccountDetail(address) {
  return {
    type: SHOW_ACCOUNT_DETAIL,
    value: address,
  }
}

function showAccountsPage() {
  return {
    type: SHOW_ACCOUNTS_PAGE,
  }
}

function showConfTxPage() {
  return {
    type: SHOW_CONF_TX_PAGE,
  }
}