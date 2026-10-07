import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DashboardScreen({ user, onLogout }) {
  return (
    <View style={s.container}>
      <Text style={s.title}>Welcome, {user.name}!</Text>
      <Text style={s.sub}>{user.email}</Text>
      <TouchableOpacity style={s.button} onPress={onLogout}>
        <Text style={s.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 26, fontWeight: 'bold' },
  sub: { color: '#666', marginVertical: 8 },
  button: { backgroundColor: '#dc2626', paddingVertical: 12, paddingHorizontal: 32, borderRadius: 8, marginTop: 24 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});