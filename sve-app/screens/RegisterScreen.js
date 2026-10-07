import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { api } from '../api';

export default function RegisterScreen({ onAuth, goLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    if (!name || !email || password.length < 6)
      return Alert.alert('Fill all fields (password min 6 characters)');
    setBusy(true);
    try {
      const res = await api.post('/auth/register', { name: name.trim(), email: email.trim(), password });
      await onAuth(res.data);
    } catch (err) {
      Alert.alert('Register failed', err.response?.data?.message || 'Cannot reach server');
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Create Account</Text>
      <TextInput style={s.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={s.input} placeholder="Email" autoCapitalize="none"
        keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={s.input} placeholder="Password" secureTextEntry
        value={password} onChangeText={setPassword} />
      <TouchableOpacity style={s.button} onPress={submit} disabled={busy}>
        <Text style={s.buttonText}>{busy ? 'Please wait...' : 'Register'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={goLogin}>
        <Text style={s.link}>Have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  button: { backgroundColor: '#2563eb', padding: 14, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 16, textAlign: 'center', color: '#2563eb' },
});