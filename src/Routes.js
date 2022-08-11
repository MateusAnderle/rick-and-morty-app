import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './screens/Home';
import { Episodes } from './screens/Episodes';
import { Location } from './screens/Location';
import { Feather } from '@expo/vector-icons'; 

const Tab = createBottomTabNavigator();

export function Routes(){
    return(
        <Tab.Navigator
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#000',
                    borderTopWidth: 0,
                    height: 90,
                    borderTopColor: '#98FB98',
                    borderTopWidth: 3,
                }
            }}
        >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused }) => {
                        if(focused) {
                            return <Feather name="users" size={24} color="#98FB98" />
                        }

                        return <Feather name="users" size={24} color="#FFF" />
                    }
                }}
            />
            <Tab.Screen
                name='Episodes'
                component={Episodes}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if(focused) {
                            return <Feather name="monitor" size={24} color="#98FB98" />
                        }

                        return <Feather name="monitor" size={24} color="#FFF" />
                    }
                }}
            />
            <Tab.Screen
                name='Location'
                component={Location}
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused }) => {
                        if(focused) {
                            return <Feather name="map-pin" size={24} color="#98FB98" />
                        }

                        return <Feather name="map-pin" size={24} color="#FFF" />
                    }
                }}
            />

        </Tab.Navigator>
    );
}
