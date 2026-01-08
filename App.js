import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import TabNavigator from "./navigation/TabNavigator";
import { WatchlistProvider } from './context/WatchlistContext';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import WatchlistScreen from './screens/WatchlistScreen';
import SplashScreen from "./screens/SplashScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WatchlistProvider>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: "fade" }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen
  name="Details"
  component={MovieDetailsScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="Watchlist"
  component={WatchlistScreen}
  options={{
    title: 'My Watchlist',
    headerStyle: { backgroundColor: '#000' },
    headerTintColor: '#fff',
  }}
/>
      </Stack.Navigator>
    </NavigationContainer>
    </WatchlistProvider>
  );
}
