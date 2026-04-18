import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform,
  StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { MapPin, Edit3, BellRing, Moon, Sprout, User, Mail, X, LogOut } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

export const ProfileScreen = ({ navigation }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  
  // User Profile State
  const [userData, setUserData] = useState({
    name: 'Juan Pérez',
    email: 'juan.perez@agroia.com',
    location: 'Sinaloa, México',
    joinDate: 'Miembro desde Enero 2024'
  });

  // Modal State
  const [editName, setEditName] = useState(userData.name);

  const handleSaveProfile = () => {
    setUserData({ ...userData, name: editName });
    setModalVisible(false);
  };

  const styles = getStyles(theme, isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarLarge}>
              <User color={theme.colors.primary} size={40} />
            </View>
            <TouchableOpacity 
              style={styles.editBadge}
              onPress={() => setModalVisible(true)}
            >
              <Edit3 color="#FFF" size={14} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{userData.name}</Text>
          <View style={styles.locationContainer}>
            <MapPin color={theme.colors.textSecondary} size={14} />
            <Text style={styles.locationText}>{userData.location}</Text>
          </View>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Lotes</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>84%</Text>
            <Text style={styles.statLabel}>Eficiencia</Text>
          </Card>
          <Card style={styles.statCard}>
            <Text style={styles.statValue}>2.4k</Text>
            <Text style={styles.statLabel}>Alertas</Text>
          </Card>
        </View>

        {/* Settings Groups */}
        <Text style={styles.groupTitle}>PREFERENCIAS</Text>
        <Card style={styles.settingsGroup}>
          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: isDarkMode ? '#1E3A2F' : '#DCFCE7' }]}>
                <Moon color={theme.colors.primary} size={20} />
              </View>
              <Text style={styles.settingLabel}>Modo Oscuro</Text>
            </View>
            <Switch 
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={Platform.OS === 'ios' ? '#FFF' : theme.colors.surface}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <View style={[styles.settingIcon, { backgroundColor: isDarkMode ? '#2D3748' : '#E0E7FF' }]}>
                <BellRing color="#4F46E5" size={20} />
              </View>
              <Text style={styles.settingLabel}>Notificaciones</Text>
            </View>
            <Switch 
              value={true}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </View>
        </Card>



        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.replace('Login')}
        >
          <LogOut color={theme.colors.danger} size={20} />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <Card style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Editar Perfil</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X color={theme.colors.textSecondary} size={24} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalForm}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>NOMBRE COMPLETO</Text>
                  <View style={styles.inputWrapper}>
                    <User color={theme.colors.textSecondary} size={18} />
                    <TextInput 
                      style={styles.textInput}
                      value={editName}
                      onChangeText={setEditName}
                      placeholder="Tu nombre"
                      placeholderTextColor={theme.colors.textSecondary}
                    />
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>CORREO ELECTRÓNICO (NO EDITABLE)</Text>
                  <View style={[styles.inputWrapper, styles.disabledInput]}>
                    <Mail color={theme.colors.textSecondary} size={18} />
                    <TextInput 
                      style={[styles.textInput, { opacity: 0.6 }]}
                      value={userData.email}
                      editable={false}
                    />
                  </View>
                </View>

                <Button 
                  title="Guardar Cambios" 
                  onPress={handleSaveProfile}
                  style={styles.saveButton}
                />
              </View>
            </Card>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const getStyles = (theme, isDarkMode) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: 24,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: theme.colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.primary,
    ...theme.shadows.glow,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 40,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
    fontWeight: '600',
  },
  groupTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    marginBottom: 12,
    letterSpacing: 1,
  },
  settingsGroup: {
    padding: 8,
    marginBottom: 32,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    padding: 16,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.danger,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContainer: {
    width: '100%',
  },
  modalContent: {
    padding: 24,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.text,
  },
  modalForm: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 0.5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    gap: 12,
  },
  disabledInput: {
    backgroundColor: theme.colors.surfaceHighlight,
    opacity: 0.6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  saveButton: {
    marginTop: 10,
  }
});
