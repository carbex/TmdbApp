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
            headerShown: false,
            title: "Rechercher",
            headerTitleAlign: "center",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("Modal")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  marginRight: 15,
                })}
              >
                <Text>Modal</Text>
              </Pressable>
            ),
          })}
        />
        <SearchStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={() => ({
            headerShown: true,
            // headerTransparent: true,
            title: "",
            gestureEnabled: true,
            headerBackImage: () => (
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors[colorScheme].text}
                style={{
                  marginRight: 15,
                  borderRadius: 20,
                  backgroundColor: "white",
                  padding: 5,
                }}
              />
            ),
          })}
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

const FavoritesStack = createStackNavigator();

const FavoritesStackNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <FavoritesStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
        headerStyle: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,
          elevation: 12,
        },
      }}
    >
      <FavoritesStack.Group>
        <FavoritesStack.Screen
          name="FavoritesScreen"
          component={Favorites}
          options={{
            headerShown: true,
            title: "Favoris",
            headerTitleAlign: "center",
          }}
        />
        <FavoritesStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={() => ({
            headerShown: true,
            title: "",
            gestureEnabled: true,
            headerBackImage: () => (
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            ),
          })}
        />
      </FavoritesStack.Group>
    </FavoritesStack.Navigator>
  );
};

const NewsStack = createStackNavigator();

const NewsStackNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <NewsStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
        headerStyle: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,
          elevation: 12,
        },
      }}
    >
      <NewsStack.Group>
        <NewsStack.Screen
          name="NewsScreen"
          component={News}
          options={{
            headerShown: true,
            title: "Nouveautés",
            headerTitleAlign: "center",
          }}
        />
        <NewsStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={() => ({
            headerShown: true,
            title: "",
            gestureEnabled: true,
            headerBackImage: () => (
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            ),
          })}
        />
      </NewsStack.Group>
    </NewsStack.Navigator>
  );
};

const SeenStack = createStackNavigator();

const SeenStackNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <SeenStack.Navigator
      screenOptions={{
        headerMode: "screen",
        headerStyle: { backgroundColor: "white" },
        headerTitleStyle: { fontWeight: "bold" },
        headerStyle: {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4.84,
          elevation: 12,
        },
      }}
    >
      <SeenStack.Group>
        <SeenStack.Screen
          name="SeenScreen"
          component={Seen}
          options={{
            headerShown: true,
            title: "Déjà vu",
            headerTitleAlign: "center",
          }}
        />
        <SeenStack.Screen
          name="FilmDetail"
          component={FilmDetail}
          options={() => ({
            headerShown: true,
            title: "",
            gestureEnabled: true,
            headerBackImage: () => (
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            ),
          })}
        />
      </SeenStack.Group>
    </SeenStack.Navigator>
  );
};

const BottomTab = createBottomTabNavigator();

const MovieTabNavigator = () => {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarInactiveTintColor: "black",
      }}
    >
      <BottomTab.Screen
        name="SearchStack"
        component={SearchStackNavigator}
        options={{
          headerShown: false,
          title: "Rechercher",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="NewsStack"
        component={NewsStackNavigator}
        options={{
          headerShown: false,
          title: "Nouveautés",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="film-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="FavoritesStack"
        component={FavoritesStackNavigator}
        options={{
          headerShown: false,
          title: "Favoris",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="heart-outline" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="SeenStack"
        component={SeenStackNavigator}
        options={{
          headerShown: false,
          title: "Vu",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="eye-outline" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
