import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Bell, Droplets, Thermometer, Wind, BrainCircuit, ChevronDown, MapPin, AreaChart, Settings } from 'lucide-react-native';

export const FieldsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <UserPlaceholder />
            </View>
            <Text style={styles.userName}>Agro AI</Text>
          </View>
          <TouchableOpacity>
            <Bell color={theme.colors.primaryDark} size={24} />
          </TouchableOpacity>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapGrid}>
            <View style={[styles.parcel, styles.parcelGood]}><Text style={styles.parcelText}>92%</Text></View>
            <View style={[styles.parcel, styles.parcelGood]}><Text style={styles.parcelText}>88%</Text></View>
            <View style={[styles.parcel, styles.parcelWarning]}><Text style={styles.parcelTextDark}>42%</Text></View>
            <View style={[styles.parcel, styles.parcelGood]}><Text style={styles.parcelText}>90%</Text></View>
            <View style={[styles.parcel, styles.parcelDanger, styles.parcelActive]}>
              <Text style={styles.parcelTextDark}>12%</Text>
              <View style={styles.alertDot} />
            </View>
            <View style={[styles.parcel, styles.parcelGood]}><Text style={styles.parcelText}>82%</Text></View>
            <View style={[styles.parcel, styles.parcelGood]}><Text style={styles.parcelText}>87%</Text></View>
            <View style={[styles.parcel, styles.parcelGood]}><Text style={styles.parcelText}>94%</Text></View>
          </View>
          
          <Card style={styles.insightFloating}>
            <View style={styles.insightHeader}>
              <View style={styles.insightIconWrapper}>
                <BrainCircuit color="#FFF" size={16} />
              </View>
              <Text style={styles.insightTitle}>Perspectivas de IA</Text>
            </View>
            <Text style={styles.insightText}>La parcela B3 requiere riego urgente. El nivel de humedad bajó un 12% en las últimas 4 horas.</Text>
          </Card>
        </View>

        {/* Parcel Details */}
        <Card style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <View>
              <Text style={styles.detailsSubtitle}>PARCELA ACTIVA</Text>
              <Text style={styles.detailsTitle}>Parcela B3</Text>
            </View>
            <View style={styles.badgeDanger}>
              <Text style={styles.badgeDangerText}>NECESITA AGUA</Text>
            </View>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <SproutIcon />
                <Text style={styles.infoLabel}>Tipo de Cultivo</Text>
              </View>
              <Text style={styles.infoValue}>Maíz</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <DropletIcon color="#3B82F6" />
                <Text style={styles.infoLabel}>Humedad Actual</Text>
              </View>
              <Text style={styles.infoValueBold}>12%</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <DropletIcon color={theme.colors.danger} />
                <Text style={styles.infoLabel}>Necesidad de Agua</Text>
              </View>
              <Text style={styles.infoValue}>2 L/m²</Text>
            </View>
          </View>

          <Button 
            title="Iniciar Riego por Goteo" 
            variant="primary" 
            icon={<Droplets color="#FFF" size={20} />} 
            style={styles.primaryButton}
          />
        </Card>

        {/* Weather Widgets */}
        <View style={styles.weatherContainer}>
          <Card style={styles.weatherCard}>
            <Thermometer color="#3B82F6" size={24} />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherValue}>24°C</Text>
              <Text style={styles.weatherLabel}>TEMP. SUELO</Text>
            </View>
          </Card>
          <Card style={styles.weatherCard}>
            <Wind color={theme.colors.primaryDark} size={24} />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherValue}>12km/h</Text>
              <Text style={styles.weatherLabel}>VIENTO</Text>
            </View>
          </Card>
        </View>

        {/* Settings */}
        <Card style={styles.settingsCard}>
          <Text style={styles.settingsTitle}>Ajustes del Terreno</Text>
          <Text style={styles.settingsSubtitle}>Configuración y parámetros generales de la parcela activa.</Text>

          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>SUPERFICIE TOTAL</Text>
            <View style={styles.inputMock}>
              <AreaChart color={theme.colors.primaryDark} size={18} />
              <Text style={styles.inputText}>12.5 Hectáreas</Text>
            </View>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>UBICACIÓN GEOGRÁFICA</Text>
            <View style={styles.inputMock}>
              <MapPin color={theme.colors.primaryDark} size={18} />
              <Text style={styles.inputText}>Sector Norte, Lote 4</Text>
            </View>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>CULTIVO ACTUAL</Text>
            <View style={[styles.inputMock, styles.dropdownMock]}>
              <Text style={styles.inputText}>Maíz (Zea mays)</Text>
              <ChevronDown color={theme.colors.textSecondary} size={18} />
            </View>
          </View>

          <Button 
            title="Guardar Configuración" 
            variant="outline" 
            style={styles.secondaryButton}
          />
        </Card>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Mini components for icons to match design
const UserPlaceholder = () => (
  <Image 
    source={require('../../../assets/logo.png')}
    style={{ width: 32, height: 32, borderRadius: 8 }} 
  />
);

const SproutIcon = () => (
  <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 10, height: 12, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.primary, borderBottomLeftRadius: 8 }} />
  </View>
);

const DropletIcon = ({ color }) => (
  <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color, borderTopRightRadius: 0, transform: [{rotate: '-45deg'}] }} />
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
    marginBottom: theme.spacing.lg,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userName: {
    color: theme.colors.primaryDark,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  mapContainer: {
    backgroundColor: '#E5E7EB', // Lighter background for map
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    position: 'relative',
    height: 280,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  parcel: {
    width: '23%',
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  parcelGood: {
    backgroundColor: 'rgba(16, 185, 129, 0.4)', // Light green
  },
  parcelWarning: {
    backgroundColor: 'rgba(245, 158, 11, 0.2)', // Light yellow/orange
  },
  parcelDanger: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)', // Light red
    borderColor: theme.colors.danger,
    borderWidth: 1.5,
  },
  parcelText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  parcelTextDark: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
  alertDot: {
    position: 'absolute',
    bottom: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.danger,
  },
  insightFloating: {
    position: 'absolute',
    bottom: -20,
    left: theme.spacing.md,
    right: theme.spacing.md,
    padding: theme.spacing.md,
    ...theme.shadows.glow,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: 4,
  },
  insightIconWrapper: {
    backgroundColor: theme.colors.primaryDark,
    padding: 4,
    borderRadius: 6,
  },
  insightTitle: {
    color: theme.colors.text,
    fontWeight: 'bold',
    fontSize: theme.typography.sizes.sm,
  },
  insightText: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    lineHeight: 16,
  },
  detailsCard: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.xl,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  detailsSubtitle: {
    color: theme.colors.danger,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  detailsTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
  },
  badgeDanger: {
    backgroundColor: theme.colors.dangerBackground,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeDangerText: {
    color: theme.colors.danger,
    fontSize: 10,
    fontWeight: 'bold',
  },
  infoList: {
    marginBottom: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  infoLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
  },
  infoValue: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
  },
  infoValueBold: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  primaryButton: {
    marginTop: theme.spacing.sm,
  },
  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  weatherCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    padding: theme.spacing.md,
  },
  weatherInfo: {
    flex: 1,
  },
  weatherValue: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
  },
  weatherLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  settingsCard: {
    padding: theme.spacing.xl,
  },
  settingsTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingsSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    marginBottom: theme.spacing.xl,
  },
  settingGroup: {
    marginBottom: theme.spacing.lg,
  },
  settingLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  inputMock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  dropdownMock: {
    justifyContent: 'space-between',
  },
  inputText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '500',
  },
  secondaryButton: {
    backgroundColor: '#E5F6EE', // Very light green
    borderColor: 'transparent',
  }
});
