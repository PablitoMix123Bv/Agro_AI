import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Switch, TouchableOpacity } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Bell, MapPin, Edit3, BellRing, Moon, Sprout } from 'lucide-react-native';

export const ProfileScreen = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandInfo}>
            <View style={styles.avatar}>
               <UserPlaceholder />
            </View>
            <Text style={styles.brandName}>Agro AI</Text>
          </View>
          <TouchableOpacity>
            <Bell color={theme.colors.primaryDark} size={24} />
          </TouchableOpacity>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <Text style={styles.accountType}>CUENTA PREMIUM</Text>
          <Text style={styles.userName}>Marcus Thorne</Text>
          
          <View style={styles.locationContainer}>
            <MapPin color={theme.colors.textSecondary} size={14} />
            <Text style={styles.locationText}>Granja Green Valley • Oregón, EE. UU.</Text>
          </View>

          <Button 
            title="Editar Perfil" 
            variant="primary" 
            icon={<Edit3 color="#FFF" size={16} />}
            style={styles.editButton}
          />
        </View>

        {/* Stats Cards */}
        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>SUPERFICIE TOTAL</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>1,240</Text>
            <Text style={styles.statUnit}>ha</Text>
          </View>
        </Card>

        <Card style={styles.statCard}>
          <Text style={styles.statLabel}>CAMPOS ACTIVOS</Text>
          <Text style={styles.statValue}>14</Text>
        </Card>

        {/* System Settings */}
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>Ajustes del Sistema</Text>
          
          <Card style={styles.settingsCard}>
            
            {/* Setting 1: Push Notifications */}
            <View style={styles.settingRow}>
              <View style={styles.settingIconWrapper}>
                <BellRing color={theme.colors.primaryDark} size={20} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingItemTitle}>Notificaciones Push</Text>
                <Text style={styles.settingItemDesc}>Alertas en tiempo real sobre humedad del suelo y clima</Text>
              </View>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primaryDark }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.divider} />

            {/* Setting 2: Dark Mode */}
            <View style={styles.settingRow}>
              <View style={[styles.settingIconWrapper, { backgroundColor: '#F3F4F6' }]}>
                <Moon color={theme.colors.textSecondary} size={20} />
              </View>
              <View style={styles.settingTextContainer}>
                <Text style={styles.settingItemTitle}>Modo Oscuro</Text>
                <Text style={styles.settingItemDesc}>Reduce la fatiga visual durante turnos nocturnos</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: theme.colors.border, true: theme.colors.primaryDark }}
                thumbColor="#FFFFFF"
              />
            </View>

          </Card>
        </View>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const UserPlaceholder = () => (
  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: '#111827', overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFF', alignSelf: 'center', marginTop: 2 }} />
    <View style={{ width: 20, height: 12, borderRadius: 8, backgroundColor: '#FFF', alignSelf: 'center', marginTop: 2 }} />
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  brandName: {
    color: theme.colors.primaryDark,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  profileSection: {
    marginBottom: theme.spacing.xl,
  },
  accountType: {
    color: theme.colors.primaryDark,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  userName: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xxl,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: theme.spacing.lg,
  },
  locationText: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
  },
  editButton: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 100, // Pill shape
  },
  statCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.xl,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
  },
  statUnit: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
  },
  settingsSection: {
    marginTop: theme.spacing.lg,
  },
  settingsTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.md,
  },
  settingsCard: {
    padding: theme.spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  settingIconWrapper: {
    backgroundColor: '#DCFCE7', // Light green bg
    padding: 10,
    borderRadius: 20,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingItemTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  settingItemDesc: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  }
});
