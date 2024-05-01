

const ChatProfileComp = ({data}: any) => {
  return (
    <>
      <div className="w-full flex justify-start bg-white z-10 gap-4 p-4 border-b-[1px] border-[#e0e0e0] absolute top-0 left-0 right-0">
        <div>
          <img src={data.profileImage || 'https://picsum.photos/200'} width={'40px'} height={"40px"} className="rounded-lg" alt="profile image" />
        </div>

        <div className="my-auto">
          <p className="text-[#042F9C] text-sm font-semibold">John Doe</p>
          <p className="text-[#BFBFBF] text-sm ">last seen at 12:30pm</p>
        </div>
      </div>
    </>
  )
}

export default ChatProfileComp;