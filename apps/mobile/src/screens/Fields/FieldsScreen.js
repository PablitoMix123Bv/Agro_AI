import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Droplets, Thermometer, Wind, BrainCircuit, ChevronDown, MapPin, AreaChart, X } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

const PARCELS_DATA = [
  { id: 'A1', name: 'Parcela A1', percentage: 92, crop: 'Trigo', location: 'Sector Norte, Lote 1', area: '10.2 ha', waterNeed: '0.5 L/m²', temp: '22°C', wind: '10km/h' },
  { id: 'A2', name: 'Parcela A2', percentage: 88, crop: 'Trigo', location: 'Sector Norte, Lote 2', area: '8.5 ha', waterNeed: '0.8 L/m²', temp: '23°C', wind: '12km/h' },
  { id: 'A3', name: 'Parcela A3', percentage: 42, crop: 'Trigo', location: 'Sector Norte, Lote 3', area: '15.0 ha', waterNeed: '1.2 L/m²', temp: '25°C', wind: '15km/h' },
  { id: 'B1', name: 'Parcela B1', percentage: 90, crop: 'Trigo', location: 'Sector Sur, Lote 1', area: '12.0 ha', waterNeed: '0.4 L/m²', temp: '21°C', wind: '8km/h' },
  { id: 'B2', name: 'Parcela B2', percentage: 12, crop: 'Trigo', location: 'Sector Sur, Lote 2', area: '12.5 ha', waterNeed: '2.5 L/m²', temp: '28°C', wind: '18km/h' },
  { id: 'B3', name: 'Parcela B3', percentage: 82, crop: 'Trigo', location: 'Sector Sur, Lote 3', area: '20.1 ha', waterNeed: '0.7 L/m²', temp: '24°C', wind: '11km/h' },
  { id: 'C1', name: 'Parcela C1', percentage: 87, crop: 'Trigo', location: 'Sector Este, Lote 1', area: '11.0 ha', waterNeed: '0.9 L/m²', temp: '23°C', wind: '9km/h' },
  { id: 'C2', name: 'Parcela C2', percentage: 94, crop: 'Trigo', location: 'Sector Este, Lote 2', area: '9.8 ha', waterNeed: '0.3 L/m²', temp: '20°C', wind: '7km/h' },
];

export const FieldsScreen = () => {
  const { isDarkMode, theme } = useTheme();
  const [isIrrigating, setIsIrrigating] = useState(false);
  const [selectedParcelId, setSelectedParcelId] = useState('B2'); 
  
  const selectedParcel = useMemo(() => 
    PARCELS_DATA.find(p => p.id === selectedParcelId) || PARCELS_DATA[0]
  , [selectedParcelId]);

  // Settings State 
  const [area, setArea] = useState(selectedParcel.area);
  const [location, setLocation] = useState(selectedParcel.location);
  const [crop, setCrop] = useState(selectedParcel.crop);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync settings when parcel changes
  React.useEffect(() => {
    setArea(selectedParcel.area);
    setLocation(selectedParcel.location);
    setCrop(selectedParcel.crop);
    setHasChanges(false);
  }, [selectedParcel]);

  const checkChanges = (newArea, newLoc, newCrop) => {
    if (newArea !== selectedParcel.area || newLoc !== selectedParcel.location || newCrop !== selectedParcel.crop) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  };

  const handleSave = () => {
    setHasChanges(false);
  };

  const styles = getStyles(theme, isDarkMode);

  const getParcelStyle = (percentage) => {
    if (percentage >= 70) return styles.parcelGood;
    if (percentage >= 40) return styles.parcelWarning;
    return styles.parcelDanger;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <UserPlaceholder theme={theme} />
            </View>
            <Text style={styles.userName}>Agro AI</Text>
          </View>
        </View>

        {/* Map Container */}
        <View style={styles.mapContainer}>
          <View style={styles.mapGrid}>
            {PARCELS_DATA.map((parcel) => (
              <TouchableOpacity 
                key={parcel.id}
                style={[
                  styles.parcel, 
                  getParcelStyle(parcel.percentage),
                  selectedParcelId === parcel.id && styles.parcelActive
                ]}
                onPress={() => setSelectedParcelId(parcel.id)}
              >
                <Text style={parcel.percentage >= 70 ? styles.parcelText : styles.parcelTextDark}>
                  {parcel.percentage}%
                </Text>
                {parcel.percentage < 40 && <View style={styles.alertDot} />}
              </TouchableOpacity>
            ))}
          </View>
          
          <Card style={styles.insightFloating}>
            <View style={styles.insightHeader}>
              <View style={styles.insightIconWrapper}>
                <BrainCircuit color="#FFF" size={16} />
              </View>
              <Text style={styles.insightTitle}>Perspectivas de IA</Text>
            </View>
            <Text style={styles.insightText}>
              {selectedParcel.percentage < 40 
                ? `La ${selectedParcel.name} requiere riego urgente. El nivel de humedad es crítico (${selectedParcel.percentage}%).`
                : `La ${selectedParcel.name} se encuentra en niveles aceptables. Monitoreo continuo activo.`}
            </Text>
          </Card>
        </View>

        {/* Parcel Details */}
        <Card style={styles.detailsCard}>
          <View style={styles.detailsHeader}>
            <View>
              <Text style={[styles.detailsSubtitle, selectedParcel.percentage >= 40 && { color: theme.colors.primary }]}>
                {selectedParcel.percentage < 40 ? 'NECESITA ATENCIÓN' : 'ESTADO ESTABLE'}
              </Text>
              <Text style={styles.detailsTitle}>{selectedParcel.name}</Text>
            </View>
            <View style={selectedParcel.percentage < 40 ? styles.badgeDanger : styles.badgeSuccess}>
              <Text style={selectedParcel.percentage < 40 ? styles.badgeDangerText : styles.badgeSuccessText}>
                {selectedParcel.percentage < 40 ? 'NECESITA AGUA' : 'ÓPTIMO'}
              </Text>
            </View>
          </View>

          <View style={styles.infoList}>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <SproutIcon theme={theme} />
                <Text style={styles.infoLabel}>Tipo de Cultivo</Text>
              </View>
              <Text style={styles.infoValue}>{selectedParcel.crop}</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <DropletIcon color="#3B82F6" />
                <Text style={styles.infoLabel}>Humedad Actual</Text>
              </View>
              <Text style={styles.infoValueBold}>{selectedParcel.percentage}%</Text>
            </View>
            <View style={styles.infoRow}>
              <View style={styles.infoLabelContainer}>
                <DropletIcon color={selectedParcel.percentage < 40 ? theme.colors.danger : theme.colors.primary} />
                <Text style={styles.infoLabel}>Necesidad de Agua</Text>
              </View>
              <Text style={styles.infoValue}>{selectedParcel.waterNeed}</Text>
            </View>
          </View>

          <Button 
            title={isIrrigating ? "Detener Riego" : "Iniciar Riego por Goteo"} 
            variant={isIrrigating ? "outline" : "primary"} 
            icon={isIrrigating ? <X color={theme.colors.danger} size={20} /> : <Droplets color="#FFF" size={20} />} 
            style={[styles.primaryButton, isIrrigating && { borderColor: theme.colors.danger }]}
            textStyle={isIrrigating && { color: theme.colors.danger }}
            onPress={() => setIsIrrigating(!isIrrigating)}
          />
        </Card>

        {/* Weather Widgets */}
        <View style={styles.weatherContainer}>
          <Card style={styles.weatherCard}>
            <Thermometer color="#3B82F6" size={24} />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherValue}>{selectedParcel.temp}</Text>
              <Text style={styles.weatherLabel}>TEMP. SUELO</Text>
            </View>
          </Card>
          <Card style={styles.weatherCard}>
            <Wind color={theme.colors.primary} size={24} />
            <View style={styles.weatherInfo}>
              <Text style={styles.weatherValue}>{selectedParcel.wind}</Text>
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
              <AreaChart color={theme.colors.primary} size={18} />
              <TextInput 
                style={styles.inputText}
                value={area}
                onChangeText={(val) => {
                  setArea(val);
                  checkChanges(val, location, crop);
                }}
              />
            </View>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>UBICACIÓN GEOGRÁFICA</Text>
            <View style={styles.inputMock}>
              <MapPin color={theme.colors.primary} size={18} />
              <TextInput 
                style={styles.inputText}
                value={location}
                onChangeText={(val) => {
                  setLocation(val);
                  checkChanges(area, val, crop);
                }}
              />
            </View>
          </View>

          <View style={styles.settingGroup}>
            <Text style={styles.settingLabel}>CULTIVO ACTUAL (SOLO TRIGO)</Text>
            <View style={[styles.inputMock, styles.disabledInput]}>
              <TextInput 
                style={[styles.inputText, styles.disabledText]}
                value={crop}
                editable={false}
              />
              <X color={theme.colors.textSecondary} size={18} />
            </View>
          </View>

          <Button 
            title="Guardar Configuración" 
            variant={hasChanges ? "primary" : "outline"} 
            style={[
              styles.secondaryButton, 
              hasChanges && { backgroundColor: '#064E3B', borderColor: '#064E3B' }
            ]}
            textStyle={hasChanges && { color: '#FFF' }}
            onPress={handleSave}
            disabled={!hasChanges}
          />
        </Card>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const UserPlaceholder = ({ theme }) => (
  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.surfaceHighlight, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.textSecondary, alignSelf: 'center', marginTop: 2 }} />
    <View style={{ width: 20, height: 12, borderRadius: 8, backgroundColor: theme.colors.textSecondary, alignSelf: 'center', marginTop: 2 }} />
  </View>
);

const SproutIcon = ({ theme }) => (
  <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 10, height: 12, borderLeftWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.primary, borderBottomLeftRadius: 8 }} />
  </View>
);

const DropletIcon = ({ color }) => (
  <View style={{ width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: color, borderTopRightRadius: 0, transform: [{rotate: '-45deg'}] }} />
  </View>
);

const getStyles = (theme, isDarkMode) => StyleSheet.create({
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
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  mapContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    position: 'relative',
    height: 300,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  parcel: {
    width: '23%',
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  parcelActive: {
    borderColor: theme.colors.primary,
    ...theme.shadows.glow,
  },
  parcelGood: {
    backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.2)' : 'rgba(16, 185, 129, 0.4)',
  },
  parcelWarning: {
    backgroundColor: isDarkMode ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0.2)',
  },
  parcelDanger: {
    backgroundColor: isDarkMode ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.2)',
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.danger,
  },
  insightFloating: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
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
    backgroundColor: theme.colors.primary,
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
  badgeSuccess: {
    backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.1)' : '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeSuccessText: {
    color: isDarkMode ? '#81C784' : '#166534',
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
    backgroundColor: theme.colors.surfaceHighlight,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  },
  disabledInput: {
    backgroundColor: theme.colors.surfaceHighlight,
    opacity: 0.6,
  },
  disabledText: {
    color: theme.colors.textSecondary,
  },
  inputText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '500',
    flex: 1,
  },
  secondaryButton: {
    backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.1)' : '#E5F6EE',
    borderColor: 'transparent',
  }
});
