import { useState } from 'react';
import { useImmerReducer } from 'use-immer';

// Types
interface initialStateType {
  balance: number;
  loan: number;
  isActive: boolean;
}
interface actionType {
  type: 'open' | 'deposit' | 'withdraw' | 'payloan' | 'requestloan' | 'close';
  payload?: any;
}

// State
const initialState = {
  balance: 10000,
  loan: 0,
  isActive: false,
};

// Reducer
const reducer = (state: initialStateType, action: actionType) => {
  switch (action.type) {
    case 'open':
      state.isActive = true;
      break;
    case 'close':
      state.isActive = false;
      break;
    case 'deposit':
      state.balance += action.payload;
      break;
    case 'withdraw':
      state.balance -= action.payload;
      break;
    case 'payloan':
      if (state.loan >= action.payload) {
        state.balance -= action.payload;
        state.loan -= action.payload;
      } else {
        alert('There is no debt to pay');
      }
      break;
    case 'requestloan':
      if (state.loan <= 4000 && state.loan + action.payload <= 4000) {
        state.balance += action.payload;
        state.loan += action.payload;
      } else {
        alert('The highest loan limit is 4000');
      }
      break;
    default:
      return state;
  }
};

const HomePage = () => {
  // States
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [deposit, setDeposit] = useState<number>(0);
  const [withdraw, setWithDraw] = useState<number>(0);
  const [payLoan, setPayLoan] = useState<number>(0);
  const [requestLoan, setRequestLoan] = useState<number>(0);
  // Handle Open Account
  const handleOpenAccount = (): void => {
    dispatch({ type: 'open' });
    alert('Open Account');
  };
  // Handle Close Account
  const handleCloseAccount = (): void => {
    dispatch({ type: 'close' });
    alert('Close Account');
  };
  // Handle Diposit Account
  const handleDepositAccount = () => {
    dispatch({ type: 'deposit', payload: deposit });
    setDeposit(0);
  };
  // Handle WithDraw Account
  const handleWithDrawAccount = () => {
    dispatch({ type: 'withdraw', payload: withdraw });
    setWithDraw(0);
  };

  // Handle Pay Loan
  const handlePayLoan = () => {
    dispatch({ type: 'payloan', payload: payLoan });
    setPayLoan(0);
  };
  // Handle Request Loan
  const handleRequestLoan = () => {
    dispatch({ type: 'requestloan', payload: requestLoan });
    setRequestLoan(0);
  };
  return (
    <div className="p-3 flex flex-col mt-3 space-y-5 rounded-md bg-gray-200 mx-auto container">
      <h1 className="text-3xl text-center">bank account</h1>
      <div className="flex flex-col space-y-5">
        {/* deposit */}
        <div className="flex gap-2 items-center">
          <input
            disabled={!state.isActive}
            value={deposit}
            onChange={(e) => {
              setDeposit(e.target.valueAsNumber);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="deposit"
            required
          />
          <button
            onClick={handleDepositAccount}
            disabled={!state.isActive}
            className="py-2 px-4 rounded-lg capitalize bg-orange-500 hover:bg-orange-400 transition delay-75 ease-linear"
          >
            request
          </button>
        </div>
        {/* widthdraw */}
        <div className="flex gap-2 items-center">
          <input
            disabled={!state.isActive}
            value={withdraw}
            onChange={(e) => {
              setWithDraw(e.target.valueAsNumber);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="withdraw"
            required
          />
          <button
            onClick={handleWithDrawAccount}
            disabled={!state.isActive}
            className="py-2 px-4 rounded-lg capitalize bg-orange-500 hover:bg-orange-400 transition delay-75 ease-linear"
          >
            request
          </button>
        </div>
        {/*  pay loan */}
        <div className="flex gap-2 items-center">
          <input
            disabled={!state.isActive}
            value={payLoan}
            onChange={(e) => {
              setPayLoan(e.target.valueAsNumber);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="pay loan"
            required
          />
          <button
            onClick={handlePayLoan}
            disabled={!state.isActive}
            className="py-2 px-4 rounded-lg capitalize bg-orange-500 hover:bg-orange-400 transition delay-75 ease-linear"
          >
            request
          </button>
        </div>
        {/* request loan */}
        <div className="flex gap-2 items-center">
          <input
            disabled={!state.isActive}
            value={requestLoan}
            onChange={(e) => {
              setRequestLoan(e.target.valueAsNumber);
            }}
            type="number"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="request loan"
            required
          />
          <button
            onClick={handleRequestLoan}
            disabled={!state.isActive}
            className="py-2 px-4 rounded-lg capitalize bg-orange-500 hover:bg-orange-400 transition delay-75 ease-linear"
          >
            request
          </button>
        </div>
      </div>
      <span className="w-full h-2 bg-gray-500 rounded-lg"></span>
      <div className="flex flex-row justify-evenly items-center flex-wrap">
        <span>balance : {state.balance}</span>
        <span>loan : {state.loan}</span>
        {state.isActive ? (
          <button
            onClick={handleCloseAccount}
            className="py-2 px-4 rounded-lg capitalize bg-red-500 hover:bg-red-400 transition delay-75 ease-linear"
          >
            close account
          </button>
        ) : (
          <button
            onClick={handleOpenAccount}
            className="py-2 px-4 rounded-lg capitalize bg-green-500 hover:bg-green-400 transition delay-75 ease-linear"
          >
            open account
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
