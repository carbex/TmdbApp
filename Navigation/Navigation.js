import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Search from "../Screens/Search";
import FilmDetail from "../Screens/FilmDetail";
import Favorites from "../Screens/Favorites";
import News from "../Screens/News";
import Seen from "../Screens/Seen";
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

const SearchStack = createStackNavigator();

const SearchStackNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <SearchStack.Group>
        <SearchStack.Screen
          name="SearchScreen"
          component={Search}
          options={({ navigation }) => ({
            headerShown: true,
            title: "Rechercher un film",
            headerTitleAlign: 'center',
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
        <SearchStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ headerShown: true, title: "Rechercher un film" }}
        />
      </SearchStack.Group>
      <SearchStack.Group screenOptions={{ presentation: "modal" }}>
        <SearchStack.Screen
          name="Modal"
          component={Modal}
          options={{ headerShown: true }}
        />
      </SearchStack.Group>
    </SearchStack.Navigator>
  );
};

const FavoritesStack = createStackNavigator()

const FavoritesStackNavigator = () => {
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <FavoritesStack.Group>
        <FavoritesStack.Screen
          name="FavoritesScreen"
          component={Favorites}
          options={{ headerShown: true, title: "Mes favoris", headerTitleAlign: 'center' }}
        />
        <FavoritesStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ headerShown: true, title: "Mes favoris" }}
        />
      </FavoritesStack.Group>
    </FavoritesStack.Navigator>
  );
}

const NewsStack = createStackNavigator()

const NewsStackNavigator = () => {
  return (
    <NewsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <NewsStack.Group>
        <NewsStack.Screen
          name="NewsScreen"
          component={News}
          options={{ headerShown: true, title: "Les dernier films", headerTitleAlign: 'center' }}
        />
        <NewsStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ headerShown: true, title: "Les dernier films" }}
        />
      </NewsStack.Group>
    </NewsStack.Navigator>
  );
}

const SeenStack = createStackNavigator()

const SeenStackNavigator = () => {
  return (
    <SeenStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
      }}
    >
      <SeenStack.Group>
        <SeenStack.Screen
          name="SeenScreen"
          component={Seen}
          options={{ headerShown: true, title: "Mes films vu", headerTitleAlign: 'center' }}
        />
        <SeenStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={{ headerShown: true, title: "Mes films vu" }}
        />
        </SeenStack.Group>
    </SeenStack.Navigator>
  );
}
  

const Tab = createBottomTabNavigator();

const MovieTabNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: "grey"
      }}
    >
      <Tab.Screen
        name="SearchStack"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
          title: "Rechercher",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tab.Screen
        name="NewsStack"
        component={NewsStackNavigator}
        options={{
          headerShown: false,
          title: "Nouveautés",
          tabBarIcon: ({ color }) => <TabBarIcon name="film" color={color} />,
        }}
      />
      <Tab.Screen
        name="FavoritesStack"
        component={FavoritesStackNavigator}
        options={{
          headerShown: false,
          title: "Favoris",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bookmark" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="SeenStack"
        component={SeenStackNavigator}
        options={{
          headerShown: false,
          title: "Vu",
          tabBarIcon: ({ color }) => <TabBarIcon name="checkmark-circle-outline" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
