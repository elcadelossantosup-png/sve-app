import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from './api';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import DashboardScreen from './screens/DashboardScreen';

export default function App() {
  const [user, setUser] = useState(null);
  const [screen, setScreen] = useState('login');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const res = await api.get('/me');
          setUser(res.data);
        }
      } catch {
        await AsyncStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleAuth = async ({ token, user }) => {
    await AsyncStorage.setItem('token', token);
    setUser(user);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setScreen('login');
  };

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (user) return <DashboardScreen user={user} onLogout={logout} />;
  if (screen === 'register')
    return <RegisterScreen onAuth={handleAuth} goLogin={() => setScreen('login')} />;
  return <LoginScreen onAuth={handleAuth} goRegister={() => setScreen('register')} />;
}