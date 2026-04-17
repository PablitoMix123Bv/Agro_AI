import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { Eye, EyeOff, Square, CheckSquare, ArrowRight, Leaf } from 'lucide-react-native';

export const Login_Screen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Validaciones
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail && password.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.content}>
            {/* Logo y Título */}
            <View style={styles.header}>
              <View style={styles.logoRow}>
                <Leaf color="#166534" size={24} />
                <Text style={styles.logoText}>Agro IA</Text>
              </View>
              <Text style={styles.title}>Bienvenido</Text>
              <Text style={styles.subtitle}>
                Inicia sesión para continuar
              </Text>
            </View>

            {/* Formulario */}
            <View style={styles.form}>

              {/* Campo Correo */}
              <View style={styles.inputContainer}>
                <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                <TextInput
                  style={[
                    styles.input,
                    email.length > 0 && !isValidEmail ? styles.inputError : null
                  ]}
                  placeholder="tu@agrosmart.com"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
                {email.length > 0 && !isValidEmail && (
                  <Text style={styles.errorText}>Ingresa un correo válido</Text>
                )}
              </View>

              {/* Campo Contraseña */}
              <View style={styles.inputContainer}>
                <View style={styles.passwordHeader}>
                  <Text style={styles.label}>CONTRASEÑA</Text>
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>¿OLVIDASTE TU CONTRASEÑA?</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff color="#6B7280" size={20} />
                    ) : (
                      <Eye color="#6B7280" size={20} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {/* Recordar Sesión */}
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.7}
              >
                {rememberMe ? (
                  <CheckSquare color="#166534" size={20} />
                ) : (
                  <Square color="#D1D5DB" size={20} />
                )}
                <Text style={styles.checkboxLabel}>Recordar sesión por 30 días</Text>
              </TouchableOpacity>

              {/* Botón Iniciar Sesión */}
              <TouchableOpacity
                style={[styles.loginButton, !isFormValid && styles.loginButtonDisabled]}
                disabled={!isFormValid}
                onPress={() => navigation.replace('MainTabs')}
              >
                <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
                <ArrowRight color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>

            {/* Divisor */}
            <View style={styles.divider} />

            {/* Registro */}
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿Aún no tienes una cuenta?</Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.registerButtonText}>Registrar nuevo usuario</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Text */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>PRECISIÓN</Text>
              <Text style={styles.footerText}>SOSTENIBILIDAD</Text>
              <Text style={styles.footerText}>CIENCIA</Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Mismo fondo que la pantalla de carga
  },
  keyboardView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  content: {
    paddingHorizontal: 24,
    alignItems: 'center',
    width: '100%',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    width: '100%',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#166534',
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  forgotPassword: {
    fontSize: 11,
    fontWeight: '700',
    color: '#166534',
    letterSpacing: 0.5,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#111827',
  },
  eyeIcon: {
    padding: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    gap: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#4B5563',
  },
  loginButton: {
    backgroundColor: '#166534',
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#166534',
    opacity: 0.5, // Botón deshabilitado opaco
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    width: '100%',
    marginVertical: 32,
  },
  registerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: '#FFEDD5', // Light peach
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: '#9A3412', // Dark orange/brown
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 40,
  },
  footerText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#9CA3AF',
    letterSpacing: 1,
  }
});
