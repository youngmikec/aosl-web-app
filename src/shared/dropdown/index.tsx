import React, { useState } from 'react';

export type DropdownList = {
    label: string;
    action: any;
    disabled: boolean;
}

type Props = {
    dropdownList: DropdownList[]
}

const DropdownComp = ({ dropdownList }: Props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
        <>
            <div>

                <button 
                    id="dropdownDefaultButton" 
                    data-dropdown-toggle="dropdown" 
                    className="hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
                    inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button"
                    onClick={() => setIsCollapsed(prev => prev = !prev)}
                >
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                    </svg>
                </button>

                {/* <!-- Dropdown menu --> */}
                <div id="dropdown" className={`z-10 ${isCollapsed ? 'block': 'hidden' } bg-white divide-y divide-gray-100 rounded-lg px-2 py-1 shadow w-44 dark:bg-gray-700`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                        {
                            dropdownList &&  dropdownList.map((item: DropdownList, idx: number) => {
                                if(!item.disabled){
                                    return(
                                        <li key={idx}>
                                            <span className="block rounded-md cursor-pointer hover:bg-[#042f9c] hover:text-white px-4 py-2  dark:hover:bg-[#042f9c] dark:hover:text-white" onClick={() => {
                                                if(item.action){
                                                    item.action()
                                                }
                                            }}>{ item?.label }</span>
                                        </li>
                                    )
                                }
                            })
                        }
                        
                    </ul>
                </div>

            </div>

        
        </>
    )
}

export default DropdownComp;