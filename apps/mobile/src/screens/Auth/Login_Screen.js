import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  Pressable,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, Square, CheckSquare, ArrowRight, Leaf, X } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

import { Header } from '../../components/Header';

export const Login_Screen = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const styles = getStyles(theme, isDarkMode);

  // Validaciones
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail && password.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>

          <View style={styles.content}>
            {/* Standard Header */}
            <Header showUser={false} />

            {/* Logo y Título */}
            <View style={styles.header}>
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
                  placeholderTextColor={theme.colors.textSecondary}
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
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff color={theme.colors.textSecondary} size={20} />
                    ) : (
                      <Eye color={theme.colors.textSecondary} size={20} />
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
                  <CheckSquare color={theme.colors.primary} size={20} />
                ) : (
                  <Square color={theme.colors.border} size={20} />
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

            {/* Terms Link for Login screen as requested */}
            <TouchableOpacity 
              style={{marginTop: 20}} 
              onPress={() => setShowTerms(true)}
            >
              <Text style={styles.termsLinkText}>Términos y condiciones</Text>
            </TouchableOpacity>

            {/* Footer Text */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>PRECISIÓN</Text>
              <Text style={styles.footerText}>SOSTENIBILIDAD</Text>
              <Text style={styles.footerText}>CIENCIA</Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Terms and Conditions Modal */}
      <Modal
        visible={showTerms}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowTerms(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowTerms(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Términos y condiciones</Text>
              <TouchableOpacity onPress={() => setShowTerms(false)}>
                <X color={theme.colors.textSecondary} size={24} />
              </TouchableOpacity>
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false} style={styles.modalScroll}>
              <View style={styles.termSection}>
                <Text style={styles.termLabel}>Uso de Datos</Text>
                <Text style={styles.termText}>
                  Recopilamos la información de tus sensores (humedad, clima) exclusivamente para automatizar y optimizar tu riego. No vendemos ni compartimos tus datos con terceros.
                </Text>
              </View>

              <View style={styles.termSection}>
                <Text style={styles.termLabel}>Responsabilidad del Usuario</Text>
                <Text style={styles.termText}>
                  Nuestra IA es una herramienta de asistencia. Tú mantienes la responsabilidad final sobre la supervisión de tus parcelas y el cuidado de tus cultivos.
                </Text>
              </View>

              <View style={styles.termSection}>
                <Text style={styles.termLabel}>Exención Técnica</Text>
                <Text style={styles.termText}>
                  Al depender de hardware físico (sensores, válvulas) e internet, Agro AI no se responsabiliza por fallos de conexión, descalibración de equipos o pérdida de cosechas derivadas de anomalías en el sistema.
                </Text>
              </View>

              <View style={styles.termSection}>
                <Text style={styles.termLabel}>Seguridad</Text>
                <Text style={styles.termText}>
                  Eres responsable de mantener la privacidad de tu cuenta y contraseña.
                </Text>
              </View>
            </ScrollView>

            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowTerms(false)}
            >
              <Text style={styles.closeButtonText}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (theme, isDarkMode) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background, 
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
    color: theme.colors.primary,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
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
    color: theme.colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputError: {
    borderWidth: 1,
    borderColor: theme.colors.danger,
  },
  errorText: {
    color: theme.colors.danger,
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
    color: theme.colors.primary,
    letterSpacing: 0.5,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: theme.colors.text,
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
    color: theme.colors.textSecondary,
  },
  loginButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...theme.shadows.soft,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    width: '100%',
    marginVertical: 32,
  },
  registerContainer: {
    alignItems: 'center',
    width: '100%',
  },
  registerText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 16,
  },
  registerButton: {
    backgroundColor: isDarkMode ? 'rgba(255, 173, 213, 0.1)' : '#FFEDD5', 
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: isDarkMode ? 1 : 0,
    borderColor: 'rgba(255, 173, 213, 0.2)',
  },
  registerButtonText: {
    color: isDarkMode ? '#FFB74D' : '#9A3412',
    fontSize: 14,
    fontWeight: '700',
  },
  termsLinkText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    textDecorationLine: 'underline',
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
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxHeight: '80%',
    elevation: 20,
    ...theme.shadows.soft,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  modalScroll: {
    marginBottom: 20,
  },
  termSection: {
    marginBottom: 16,
  },
  termLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  termText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
