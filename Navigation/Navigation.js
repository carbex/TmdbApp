import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SearchScreen from "../Screens/SearchScreen";
import FilmDetailScreen from "../Screens/FilmDetailScreen";
import Favorites from "../Components/Favorites";
import News from "../Components/News";
import Modal from "../Components/Modal";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../Constants/Colors";
import { Text, Pressable, useColorScheme } from "react-native";

export default function Navigation({ colorScheme }) {
  return (
    <NavigationContainer
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <MovieTabNavigator />
    </NavigationContainer>
  );
}

const Stack = createStackNavigator();

const SearchStackNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <Stack.Group>
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Rechercher un film",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  marginRight: 15,
                })}
              >
                <Text>Modal</Text>
                {/* <Ionicons
                name="search"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              /> */}
              </Pressable>
            ),
          })}
        />
        <Stack.Screen
          name="FilmDetail"
          component={FilmDetailScreen}
          options={{ headerShown: true, title: "Détail du film sélectionné" }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ headerShown: true }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MovieTabNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          headerShown: true,
          title: "Mes favoris",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="News"
        component={News}
        options={{
          headerShown: true,
          title: "Les mieux notés",
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
