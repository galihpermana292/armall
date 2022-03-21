import GlobalStyles from './theme/globalStyles';
import theme from './theme';
import Navbar from './components/navbar';
import { ThemeProvider } from '@mui/material';
import Buttons from './components/button';
import Landing from './pages/landing';

function App() {
	return (
		<>
			<GlobalStyles />
			<Navbar />
			<Landing />
		</>
	);
}

export default App;
