import { Fragment, useState } from "react";
import React, { useEffect, useRef } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import NavbarLg from "./NavbarLg";
import NavbarSm from "./NavbarSm1";
import Profile from "./Profile";


const user = {
  name: "Neptune",
  email: "Neptune@nt.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", onClick: handleLogout },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Layout() {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  function OutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen1(false);
          setOpen2(false);

        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  OutsideAlerter(wrapperRef);

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full  w-90vw z-0" >
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <NavbarLg />
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <span className="absolute top-3  h-4 w-4 right-200 inline-flex items-center justify-center px-2 py-0.5 bg-red-500 rounded-full text-xs font-semibold text-white">
                          7
                        </span>

                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="relative ml-3 ">
                        <div>
                          <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            style={{ backgroundColor: "rgb(31, 41, 55)" }}
                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) =>
                                  item.name === "Sign out" ? (
                                    <a
                                      onClick={handleLogout}
                                      className={classNames(
                                        active ? "bg-gray-700" : "",
                                        "block px-4 py-2 text-sm text-gray-300"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  ) : (
                                    <a
                                      href={item.href}
                                      className={classNames(
                                        active ? "bg-gray-700" : "",
                                        "block px-4 py-2 text-sm text-gray-300"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )
                                }
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                  {/* Mobile menu button */}
                </div>
              </div>
              <div className="md:hidden absolute top-0 right-0 w-1/2 flex justify-end">


              <button
                        type="button"
                        className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="sr-only">View notifications</span>
                        <span className="absolute top-3  h-4 w-4 right-200 inline-flex items-center justify-center px-2 py-0.5 bg-red-500 rounded-full text-xs font-semibold text-white">
                          7
                        </span>

                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                <Disclosure className="">
                  <>
                    <button
                      className="inline-flex items-center mx-2 my-1 justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() => setOpen1(!open1)}
                    >
                      <span className="sr-only">Open main menu</span>
                      
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        
                        alt=""
                      />
                    </button>

                    {open1 ? (
                      <div ref={wrapperRef} className="absolute top-14">
                        <Profile />
                      </div>
                    ) : null}
                  </>
                </Disclosure>

                <Disclosure className="mx-2">
                  <>
                    <button
                      className="inline-flex items-center justify-center mx-2 my-1 rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={() => setOpen2(!open2)}
                    >
                      <span className="sr-only">Open main menu</span>
                      {open2 ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                    {open2 ? (
                      <div ref={wrapperRef} className="absolute top-14">
                        <NavbarSm />
                      </div>
                    ) : null}
                  </>
                </Disclosure>
              </div>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
