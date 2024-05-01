import React, { FC } from 'react';
import UserLayout from '../../../shared/layouts/user-layout';
import ChatComp from '../../../components/user-dashboard-comps/chat-comp';


// style link end 

const ChatPage: FC = () => {

    return (

        <UserLayout>
            <div className="mx-auto w-full sm:w-10/12 md:w-8/12 lg:w-8/12">
                <ChatComp />
            </div>
        </UserLayout>
    )
}

export default ChatPage;


