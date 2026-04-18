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
import { User, AtSign, Lock, Key, Square, CheckSquare, ArrowRight, Leaf, X } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

export const Registrar_usuario = ({ navigation }) => {
  const { theme, isDarkMode } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const styles = getStyles(theme, isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            
            {/* Header */}
            <View style={styles.headerContainer}>
              <View style={styles.headerTexts}>
                <Text style={styles.title}>Crear Cuenta</Text>
                <Text style={styles.subtitle}>
                  Comienza tu viaje hacia una{'\n'}agricultura más inteligente.
                </Text>
              </View>
              <View style={styles.iconCircle}>
                <Leaf color={theme.colors.primary} size={24} />
              </View>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              
              {/* Nombre Completo */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>NOMBRE COMPLETO</Text>
                <View style={styles.inputContainer}>
                  <User color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Ej. Juan Pérez"
                    placeholderTextColor={theme.colors.textSecondary}
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Correo Electrónico */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                <View style={styles.inputContainer}>
                  <AtSign color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="tu@correo.com"
                    placeholderTextColor={theme.colors.textSecondary}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>
              </View>

              {/* Contraseña */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CONTRASEÑA</Text>
                <View style={styles.inputContainer}>
                  <Lock color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              {/* Confirmar Contraseña */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CONFIRMAR CONTRASEÑA</Text>
                <View style={styles.inputContainer}>
                  <Key color={theme.colors.textSecondary} size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="••••••••"
                    placeholderTextColor={theme.colors.textSecondary}
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </View>

              {/* Términos y Condiciones */}
              <View style={styles.checkboxContainer}>
                <TouchableOpacity 
                  onPress={() => setTermsAccepted(!termsAccepted)}
                  activeOpacity={0.7}
                  style={styles.checkboxIconWrapper}
                >
                  {termsAccepted ? (
                    <CheckSquare color={theme.colors.primary} size={20} />
                  ) : (
                    <Square color={theme.colors.border} size={20} />
                  )}
                </TouchableOpacity>
                <Text style={styles.checkboxText}>
                  Acepto los <Text style={styles.boldGreenText} onPress={() => setShowTerms(true)}>Términos de Servicio</Text> y la <Text style={styles.boldGreenText} onPress={() => setShowTerms(true)}>Política de Privacidad</Text> de AgroSmart AI.
                </Text>
              </View>

              {/* Botón Crear Cuenta */}
              <TouchableOpacity 
                style={[styles.createButton, !termsAccepted && styles.createButtonDisabled]}
                disabled={!termsAccepted}
                onPress={() => {
                  navigation.replace('MainTabs'); 
                }}
              >
                <Text style={styles.createButtonText}>Crear Cuenta</Text>
                <ArrowRight color="#FFFFFF" size={20} />
              </TouchableOpacity>

            </View>

            {/* Separador */}
            <View style={styles.separatorContainer}>
              <View style={styles.line} />
              <Text style={styles.separatorText}>O REGISTRARSE CON</Text>
              <View style={styles.line} />
            </View>

            {/* Botón Google */}
            <TouchableOpacity style={styles.googleButton}>
              <View style={styles.googleIconPlaceholder}>
                <Text style={{color: '#EA4335', fontWeight: 'bold'}}>G</Text>
              </View>
              <Text style={styles.googleButtonText}>Google</Text>
            </TouchableOpacity>

            {/* Footer Iniciar Sesión */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Inicia Sesión</Text>
              </TouchableOpacity>
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
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: 24,
    padding: 24,
    width: '100%',
    ...theme.shadows.soft,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  headerTexts: {
    flex: 1,
    paddingRight: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.2)' : '#DCFCE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: theme.colors.text,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  checkboxIconWrapper: {
    marginTop: 2,
    marginRight: 12,
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  boldGreenText: {
    fontWeight: '700',
    color: theme.colors.primary,
    textDecorationLine: 'underline',
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...theme.shadows.soft,
  },
  createButtonDisabled: {
    opacity: 0.5,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  separatorText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
    backgroundColor: theme.colors.surface,
  },
  googleIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: isDarkMode ? 0 : 1,
    borderColor: '#E5E7EB',
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.primary,
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
