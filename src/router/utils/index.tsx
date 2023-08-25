import { lazy, ComponentType, Suspense } from 'react';
import { Spin } from 'antd';
export const LazyLoad = <T extends ComponentType<any>>(
	importer: () => Promise<{ default: T }>
): React.FC => {
	const LazyComponent = lazy(() => importer()) as unknown as React.FC;

	return () => (
		<Suspense
			fallback={
				<Spin
					size="large"
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%'
					}}
				/>
			}
		>
			<LazyComponent />
		</Suspense>
	);
};
