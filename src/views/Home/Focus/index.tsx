function Focus() {
	const isLogined = Boolean(localStorage.getItem('token'));
	return (
		<div>
			{isLogined || <div>登录后解锁更多精彩</div>}
			这里是关注
		</div>
	);
}

export default Focus;
