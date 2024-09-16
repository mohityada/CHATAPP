const Message = ({ message }) => {
	return (
		<div className={`chat chat-end`}>
			<div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='Tailwind CSS chat bubble component'
                     src='https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png' />
				</div>
			</div>
			<div className={`chat-bubble text-white bg-blue-500`}>Hi, how are you? </div>
			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>01:31</div>
		</div>
	);
};
export default Message;
