import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import {
  ChartPieIcon,
  AcademicCapIcon,
  UserIcon,
  BanknotesIcon,
  UserCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
export default function Example() {
  const myStyles = {
    backgroundColor: "rgb(31,41,55)",
    border: "0",
  };

  return (
    <div className="w-screen " style={myStyles}>
      <div className=" w-screen max-w-md rounded-2xl bg-white ">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                style={myStyles}
                className="flex w-screen justify-between   px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              >
                <div className="flex ">
                  <UserIcon className="block h-6 w-6 " />
                  <span className="ml-3"> Admin</span>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                style={myStyles}
                className="px-4 pt-0 pb-4  flex flex-col text-left "
              >
                <a className="pl-5 text-gray-400" href="#">
                  {" "}
                  <div className="flex ">
                    <UserCircleIcon className="block h-6 w-6 " />
                    <span className="ml-3"> Users</span>
                  </div>
                </a>
                <a className="pl-5 text-gray-400" href="#">
                  {" "}
                  <div className="flex ">
                    <BanknotesIcon className="block h-6 w-6 " />
                    <span className="ml-3"> Expense</span>
                  </div>
                </a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                style={myStyles}
                className="flex w-screen justify-between   px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              >
                <div className="flex ">
                  <AcademicCapIcon className="block h-6 w-6 " />
                  <span className="ml-3"> Client</span>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                style={myStyles}
                className="px-4 pt-0 pb-4  flex flex-col text-left "
              >
                <a className="pl-5 text-gray-400" href="#">
                  {" "}
                  <div className="flex ">
                    <AcademicCapIcon className="block h-6 w-6 " />
                    <span className="ml-3"> Client Details</span>
                  </div>
                </a>
                <a className="pl-5 text-gray-400" href="#">
                  {" "}
                  <div className="flex ">
                    <PlusCircleIcon className="block h-6 w-6 " />
                    <span className="ml-3">Add Client</span>
                  </div>
                </a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button
                style={myStyles}
                className="flex w-screen justify-between   px-4 py-2 text-left text-sm font-medium text-gray-300 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              >
                <div className="flex ">
                  <ChartPieIcon className="block h-6 w-6 " />
                  <span className="ml-3"> Report</span>
                </div>
                <ChevronUpIcon
                  className={`${
                    open ? "" : "rotate-180 transform"
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel
                style={myStyles}
                className="px-4 pt-0 pb-4  flex flex-col text-left "
              >
                <a className="pl-5 text-gray-400" href="#">
                  {" "}
                  <div className="flex ">
                    <UserCircleIcon className="block h-6 w-6 " />
                    <span className="ml-3"> Users</span>
                  </div>
                </a>
                <a className="pl-5 text-gray-400" href="#">
                  {" "}
                  <div className="flex ">
                    <BanknotesIcon className="block h-6 w-6 " />
                    <span className="ml-3"> Expense</span>
                  </div>
                </a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}
