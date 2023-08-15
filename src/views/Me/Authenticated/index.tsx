import Pic from '&/assets/temPic';
import { Button, Divider, Empty } from 'antd';
import './index.scss';

function Me() {
	return (
		<div className="me">
			<div className="me-bg">
				<img src={Pic.userBg} alt="" />
				<i className="iconfont icon-tuichu" />
			</div>

			<div className="me-header">
				<img src={Pic.userFace} alt="" />
				<div className="me-header-name">
					<h3>yikina</h3>
					<i className="iconfont icon-wenbenshuru" />
				</div>
				<div className="tips">
					<div>
						0<h5>粉丝</h5>
					</div>
					<div>
						0<h5>关注</h5>
					</div>
					<div>
						0<h5>徽章</h5>
					</div>
				</div>
				<div className="ip">
					IP属地:<span>北京</span>
				</div>
			</div>

			<div className="me-content">
				<Button type="text" block>
					我收藏的
				</Button>
				<Button type="text" block>
					我发表的
				</Button>
			</div>
			<Divider />
			<Empty />
		</div>
	);
}

export default Me;
