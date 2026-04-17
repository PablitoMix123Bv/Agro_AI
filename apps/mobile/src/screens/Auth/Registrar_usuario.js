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
import { User, AtSign, Lock, Key, Square, CheckSquare, ArrowRight, Leaf } from 'lucide-react-native';

export const Registrar_usuario = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
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
                <Leaf color="#166534" size={24} />
              </View>
            </View>

            {/* Formulario */}
            <View style={styles.form}>
              
              {/* Nombre Completo */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>NOMBRE COMPLETO</Text>
                <View style={styles.inputContainer}>
                  <User color="#6B7280" size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="Ej. Juan Pérez"
                    placeholderTextColor="#9CA3AF"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              {/* Correo Electrónico */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>CORREO ELECTRÓNICO</Text>
                <View style={styles.inputContainer}>
                  <AtSign color="#6B7280" size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="tu@correo.com"
                    placeholderTextColor="#9CA3AF"
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
                  <Lock color="#6B7280" size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
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
                  <Key color="#6B7280" size={20} style={styles.inputIcon} />
                  <TextInput 
                    style={styles.input} 
                    placeholder="••••••••"
                    placeholderTextColor="#9CA3AF"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </View>

              {/* Términos y Condiciones */}
              <TouchableOpacity 
                style={styles.checkboxContainer} 
                onPress={() => setTermsAccepted(!termsAccepted)}
                activeOpacity={0.7}
              >
                <View style={styles.checkboxIconWrapper}>
                  {termsAccepted ? (
                    <CheckSquare color="#166534" size={20} />
                  ) : (
                    <Square color="#D1D5DB" size={20} />
                  )}
                </View>
                <Text style={styles.checkboxText}>
                  Acepto los <Text style={styles.boldGreenText}>Términos de Servicio</Text> y la <Text style={styles.boldGreenText}>Política de Privacidad</Text> de AgroSmart AI.
                </Text>
              </TouchableOpacity>

              {/* Botón Crear Cuenta */}
              <TouchableOpacity 
                style={[styles.createButton, !termsAccepted && styles.createButtonDisabled]}
                disabled={!termsAccepted}
                onPress={() => {
                  // Lógica para registrar usuario y navegar a la siguiente pantalla
                  // Por ahora navega a Home/Dashboard
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F4F6', // Fondo gris claro exterior
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
    backgroundColor: '#FFFFFF', // Fondo blanco de la tarjeta
    borderRadius: 24,
    padding: 24,
    width: '100%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)',
      }
    }),
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
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#DCFCE7', // Verde muy claro
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
    color: '#6B7280',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
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
    color: '#111827',
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
    color: '#4B5563',
    lineHeight: 20,
  },
  boldGreenText: {
    fontWeight: '700',
    color: '#166534',
  },
  createButton: {
    backgroundColor: '#166534',
    borderRadius: 12,
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
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
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
  },
  googleIconPlaceholder: {
    width: 24,
    height: 24,
    backgroundColor: '#1F2937', // Fondo oscuro para contrastar la G
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#4B5563',
  },
  loginLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#166534',
  }
});
