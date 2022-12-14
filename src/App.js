import './App.css';
import firebaseJson from "./firebase.json";
import { pathnames, AppTemplate, AuthProvider, AuthRoutes, MainMenu, PublicTemplate, ResetPassword, SignIn, SignUp, UserMenu, UserProfile, UserUpdateEmail, UserUpdateName, UserUpdatePassword, UserDelete } from './lib';
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { CircularProgress, Box } from '@mui/material';
import authMethods from "./authMethods.json";

const Brand = "FIREACT";

const Logo = ({size, color}) => {
	const logoColor = color || 'warning';
	return (
		<LocalFireDepartmentIcon color={logoColor} fontSize={size} />
	);
}

const Loader = ({size}) => {
	let cpSize = "35px";
	switch(size){
		case "small":
			cpSize = "30px";
			break;
		case "medium":
			cpSize = "35px";
			break;
		case "large":
			cpSize = "45px";
			break;
		default:
			cpSize = "35px";
			break;
	}
	return (
		<Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center"}}>
			<CircularProgress color="warning" size={cpSize} />
			<div style={{position: "absolute" }}>
				<Logo size={size} />
			</div>
		</Box>
	);
}

function App() {

	return (
		<AuthProvider firebaseConfig={firebaseJson} brand={Brand}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthRoutes signInPath="/sign-in" loader={<Loader size="large" />} />} >
						<Route element={<AppTemplate logo={<Logo size="large" />} brand={Brand} toolBarMenu={<UserMenu pathnames={pathnames} />} drawerMenu={<MainMenu pathnames={pathnames}  />} />}>
							<Route exact path="/" element={<></>} />
							<Route exact path={pathnames.UserProfile} element={<UserProfile pathnames={pathnames} />} />
							<Route exact path={pathnames.UserUpdateEmail} element={<UserUpdateEmail pathnames={pathnames} />} />
							<Route exact path={pathnames.UserUpdateName} element={<UserUpdateName pathnames={pathnames} />} />
							<Route exact path={pathnames.UserUpdatePassword} element={<UserUpdatePassword pathnames={pathnames} />} />
							<Route exact path={pathnames.UserDelete} element={<UserDelete pathnames={pathnames} />} />
						</Route>
					</Route>
					<Route element={<PublicTemplate />}>
						<Route path="/sign-in" element={
							<SignIn
								logo={<Logo size="large" />}
								pathnames={pathnames}
								providers={authMethods}
							/>
						} />
						<Route path="/sign-up" element={
							<SignUp
								logo={<Logo size="large" signUpUrl="/" />}
								pathnames={pathnames}
							/>
						} />
						<Route path="/reset-password" element={
							<ResetPassword
								logo={<Logo size="large" signUpUrl="/" />}
								pathnames={pathnames}
							/>
						} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App;
