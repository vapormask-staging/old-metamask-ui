const UNLOCK_METAMASK = 'UNLOCK_METAMASK'
const UNLOCK_IN_PROGRESS = 'UNLOCK_IN_PROGRESS'
const UNLOCK_FAILED = 'UNLOCK_FAILED'
const UPDATE_METAMASK_STATE = 'UPDATE_METAMASK_STATE'
const LOCK_METAMASK = 'LOCK_METAMASK'
const SET_SELECTED_ACCOUNT = 'SET_SELECTED_ACCOUNT'
const SHOW_ACCOUNT_DETAIL = 'SHOW_ACCOUNT_DETAIL'
const SHOW_ACCOUNTS_PAGE = 'SHOW_ACCOUNTS_PAGE'

module.exports = {
  UPDATE_METAMASK_STATE: UPDATE_METAMASK_STATE,
  UNLOCK_IN_PROGRESS: UNLOCK_IN_PROGRESS,
  UNLOCK_FAILED: UNLOCK_FAILED,
  UNLOCK_METAMASK: UNLOCK_METAMASK,
  LOCK_METAMASK: LOCK_METAMASK,
  SET_SELECTED_ACCOUNT: SET_SELECTED_ACCOUNT,
  SHOW_ACCOUNT_DETAIL: SHOW_ACCOUNT_DETAIL,
  SHOW_ACCOUNTS_PAGE: SHOW_ACCOUNTS_PAGE,
  tryUnlockMetamask: tryUnlockMetamask,
  lockMetamask: lockMetamask,
  setSelectedAddress: setSelectedAddress,
  showAccountDetail: showAccountDetail,
  showAccountsPage: showAccountsPage,
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
    _accountManager.submitPassword(password, function(err, newState){
      if (err) {
        dispatch(unlockFailed())
      } else {
        dispatch(unlockMetamask())
        dispatch(updateMetamaskState(newState))
      }
    })
  }
}

function setSelectedAddress(address) {
  return function(dispatch) {
    _accountManager.setSelectedAddress(address, function(err, newState){
      if (err) return console.error(err.message)
      dispatch(updateMetamaskState(newState))
    })
  }
}

// actions

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