import { View, Text, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";

export default function ProfileScreen({ navigation }) {
  return (
    <View>
      <Text>Profile</Text>
      <Text>Watch History</Text>
      <Text>Watchlist</Text>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut(auth);
          navigation.replace("Signup");
        }}
      />
    </View>
  );
}
