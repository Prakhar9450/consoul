"use client"
import Image from "next/image"

export const DownloadGuide = () => {
    return <div className="relative">
        <div className="border p-6 md:p-12 bg-[#6438C3] text-white md:rounded-3xl font-semibold">
          <div className="grid md:grid-cols-6 gap-4">
            <div className="col-span-4 grid gap-5 ">
              <div className="text-lg md:text-3xl">
                Read our latest step-by-step guide
                <br />
                to increasing Customer Lifetime Value Metrics
              </div>
              <div>
                <button className="p-2 px-5 bg-white text-[#6438c3] flex text-xl rounded-xl">
                  <span className="mx-2">Download</span>
                  <span>
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_2_2000"
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="25"
                        height="24"
                      >
                        <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_2_2000)">
                        <path
                          d="M12.5 15.575C12.3667 15.575 12.2417 15.5542 12.125 15.5125C12.0083 15.4708 11.9 15.4 11.8 15.3L8.2 11.7C8 11.5 7.90417 11.2667 7.9125 11C7.92083 10.7333 8.01667 10.5 8.2 10.3C8.4 10.1 8.6375 9.99583 8.9125 9.9875C9.1875 9.97917 9.425 10.075 9.625 10.275L11.5 12.15V5C11.5 4.71667 11.5958 4.47917 11.7875 4.2875C11.9792 4.09583 12.2167 4 12.5 4C12.7833 4 13.0208 4.09583 13.2125 4.2875C13.4042 4.47917 13.5 4.71667 13.5 5V12.15L15.375 10.275C15.575 10.075 15.8125 9.97917 16.0875 9.9875C16.3625 9.99583 16.6 10.1 16.8 10.3C16.9833 10.5 17.0792 10.7333 17.0875 11C17.0958 11.2667 17 11.5 16.8 11.7L13.2 15.3C13.1 15.4 12.9917 15.4708 12.875 15.5125C12.7583 15.5542 12.6333 15.575 12.5 15.575ZM6.5 20C5.95 20 5.47917 19.8042 5.0875 19.4125C4.69583 19.0208 4.5 18.55 4.5 18V16C4.5 15.7167 4.59583 15.4792 4.7875 15.2875C4.97917 15.0958 5.21667 15 5.5 15C5.78333 15 6.02083 15.0958 6.2125 15.2875C6.40417 15.4792 6.5 15.7167 6.5 16V18H18.5V16C18.5 15.7167 18.5958 15.4792 18.7875 15.2875C18.9792 15.0958 19.2167 15 19.5 15C19.7833 15 20.0208 15.0958 20.2125 15.2875C20.4042 15.4792 20.5 15.7167 20.5 16V18C20.5 18.55 20.3042 19.0208 19.9125 19.4125C19.5208 19.8042 19.05 20 18.5 20H6.5Z"
                          fill="#6438C3"
                        />
                      </g>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:block absolute right-28 bottom-[1px]" >
            <Image
                src="/icons/docs.svg"
                alt="guide"
                width={200}
                height={200}
            />
        </div>
    </div>
}