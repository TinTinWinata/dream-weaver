import { Dialog, Transition } from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction } from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { TPost } from "../../types/post-type";
import CrowdfundModalForm from "./crowdfund-detail-form";

export type TCrowdfundDetailModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  post: TPost;
};

export default function CrowdfundDetailModal({
  open,
  setOpen,
  post,
}: TCrowdfundDetailModalProps) {
  return (
    <>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-900  px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BiSolidDonateBlood
                        className="h-6 w-6 text-sky-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-gray-50"
                      >
                        Donate to {post.title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-md text-gray-300">
                          Caring for others is not just about making a donation.
                          It's about making a difference.
                        </p>
                      </div>
                    </div>
                  </div>
                  <CrowdfundModalForm
                    open={open}
                    setOpen={setOpen}
                    post={post}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
