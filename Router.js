import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Text, Platform
} from 'react-native';
import {
    StackNavigator,
    TabNavigator,
    TabBarBottom,
    DrawerNavigator
} from 'react-navigation';
import IconBadge from 'react-native-icon-badge';

import App from './App';
import Header from './Src/Header/Header';
import Home from './Src/Home/Home';
import Shop from './Src/Shop/Shop';
import Search from './Src/Search/Search';
import Cart from './Src/Cart/Cart';
import About from './Src/About/About';
import SlideMenu from './Src/SlideMenu/SlideMenu';
import ProductDetail from './Src/ProductDetail/ProductDetail';
import ListProduct from './Src/ListProduct/ListProduct';
import ConfirmCart from './Src/ConfirmCart/ConfirmCart';
import OrderHistory from './Src/OrderHistory/OrderHistory';
import Infomation from './Src/Infomation/Infomation';
import OrderDetail from './Src/OrderHistory/OrderDetail';


import Login from './Src/Authentication/Login';
import Register from './Src/Authentication/Register';

export const HomeStack = StackNavigator
    ({
        HomeScreen: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        ProductDetailScreen: {
            screen: ProductDetail,
            navigationOptions: {
                header: null
            }
        },
        ListProductScreen: {
            screen: ListProduct,
            navigationOptions: {
                header: null
            }
        },
        logInScreen: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        RegisterScreen: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        },
        OrderScreen: {
            screen: OrderHistory,
            navigationOptions: {
                title: 'Order History',
                headerTintColor: '#FC6666',
            }
        },
        InfomationScreen: {
            screen: Infomation,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#B3B3B3',
                },
                title: 'Infomation',
                headerTintColor: '#2E9EFF',
            }
        },
        OrderdetailScreen: {
            screen: OrderDetail,
            navigationOptions: {
                headerTintColor: '#FC6666',
            }
        },
    },
    {
        initialRouteName: 'HomeScreen',
    })

export const ShopStack = StackNavigator
    ({
        ShopScreen: {
            screen: Shop,
            navigationOptions: {
                header: null
            }
        },
        ProductDetailScreen: {
            screen: ProductDetail,
            navigationOptions: {
                header: null
            }
        },
        ListProductScreen: {
            screen: ListProduct,
            navigationOptions: {
                header: null
            }
        },
        logInScreen: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        RegisterScreen: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        },
        OrderScreen: {
            screen: OrderHistory,
            navigationOptions: {
                title: 'Order History',
                headerTintColor: '#FC6666',
            }
        },
        InfomationScreen: {
            screen: Infomation,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: '#B3B3B3',
                },
                title: 'Infomation',
                headerTintColor: '#2E9EFF',
            }
        },
        OrderdetailScreen: {
            screen: OrderDetail,
            navigationOptions: {
                headerTintColor: '#FC6666',
            }
        },
    },
    {
        initialRouteName: 'ShopScreen',
    })

export const SearchStack = StackNavigator
    ({
        SearchScreen: {
            screen: Search,
            navigationOptions: {
                header: null
            }
        },
        ProductDetailScreen: {
            screen: ProductDetail,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'SearchScreen',
    })

export const CartStack = StackNavigator
    ({
        SearchScreen: {
            screen: Cart,
            navigationOptions: {
                header: null
            }
        },
        ProductDetailScreen: {
            screen: ProductDetail,
            navigationOptions: {
                header: null
            }
        },
        ConfirmCartScreen: {
            screen: ConfirmCart,
            navigationOptions: {
                header: null
            }
        },
        logInScreen: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        RegisterScreen: {
            screen: Register,
            navigationOptions: {
                header: null
            }
        }
    },
    {
        initialRouteName: 'SearchScreen',
    })

export const TabBar = TabNavigator(
    {
        Home_tab: {
            screen: HomeStack,
            navigationOptions: {
                title: "Home"
            }
        },
        Shop_tab: {
            screen: ShopStack,
            navigationOptions: {
                title: "Shop",
            }
        },
        Search_tab: {
            screen: SearchStack,
            navigationOptions: {
                title: "Search"
            }
        },
        Cart_tab: {
            screen: CartStack,
            navigationOptions: ({ screenProps }) => ({
                title: "Cart",
                tabBarIcon: ({ tintColor, focused }) =>
                    <IconBadge
                        MainElement={
                            <Ionicons
                                name={focused ? 'ios-cart' : 'ios-cart-outline'}
                                size={21}
                                style={{ color: tintColor }}
                            />
                        }
                        BadgeElement={<Text style={{ color: 'white' }}>{screenProps.notifiCount}</Text>}
                        Hidden={screenProps.notifiCount === 0}
                        IconBadgeStyle={
                            {
                                left: 15,
                                top: -10,
                            }
                        }
                    />
            })
        },
        About_tab: {
            screen: About,
            navigationOptions: {
                title: "About"
            }
        }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Home_tab') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                } else if (routeName === 'Shop_tab') {
                    iconName = `ios-keypad${focused ? '' : '-outline'}`;
                } else if (routeName === 'Search_tab') {
                    iconName = `ios-search${focused ? '' : '-outline'}`;
                } else if (routeName === 'About_tab') {
                    iconName = `ios-contacts${focused ? '' : '-outline'}`;
                }
                return <Ionicons name={iconName} size={21} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#FC4B38',
            inactiveTintColor: 'gray',
            showLabel: (Platform.OS !== 'android'),
            showIcon: true
        },
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        style: {
            backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue
            height: (Platform.OS === 'ios') ? 48 : 50 // I didn't use this in my app, so the numbers may be off. 
        }
    }
);

export const Menu = DrawerNavigator(
    {
        tabBar: {
            screen: TabBar
        }
    },
    {
        drawerWidth: 250,
        drawerPosition: 'left',
        contentComponent: props => <SlideMenu {...props} />
    }
);
