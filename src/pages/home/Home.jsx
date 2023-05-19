import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import viteLogo from '/vite.svg';
import reactLogo from '@/assets/react.svg';
import { Counter } from '@/features/counter/Counter';
import { incrementValueToChange, resetValueToChange } from '@/features/counter/counterSlice';


function Home() {
	const dispatch = useDispatch();
	const countState = useSelector((state) => state.counter.value);
	const valueToChangeState = useSelector((state) => state.counter.valueToChange);
	return (
		<div style={{textAlign: "center"}}>
			<div>
				<div>
					Store: value To Change {countState}
				</div>
				<a href="https://vitejs.dev" target="_blank" rel="noreferrer">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank" rel="noreferrer">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="d-flex justify-content-center">
				<button className='btn-secondary btn mx-2' onClick={() => dispatch(incrementValueToChange())}>
					INCR: value to change is {valueToChangeState}
				</button>
				<button className='btn-light btn mx-2 border' onClick={() => dispatch(resetValueToChange())}>
					reset value to change
				</button>
			</div>
			<p>
				Edit <code>src/App.jsx</code> and save to test HMR
			</p>
			<Link to={"/form"} className='btn-primary btn'>
				Form demo 🚀
			</Link>
			<div className="mt-3 border p-4">
				<Counter />
				<p>
					Counter Component
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</div>
	);
}

export default Home;