import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ImageBackground
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Sun, Droplet, Plus, BrainCircuit, User, X, ChevronDown, Tractor, LayoutGrid, Leaf } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';
import { Card } from '../../components/Card';

// Custom Semi-Circle Gauge Component
const SemiCircleGauge = ({ percentage, theme, isDarkMode }) => {
  const radius = 60;
  const strokeWidth = 14; 
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: 160 }}>
      <View style={{ height: radius + strokeWidth, width: (radius + strokeWidth) * 2, overflow: 'hidden' }}>
        <Svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
          <Path
            d={`M ${strokeWidth},${radius + strokeWidth} A ${radius},${radius} 0 0 1 ${radius * 2 + strokeWidth},${radius + strokeWidth}`}
            stroke={isDarkMode ? '#1E293B' : '#E5E7EB'}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{ transform: [{ rotate: '180deg' }], transformOrigin: 'center' }}
          />
          <Path
            d={`M ${strokeWidth},${radius + strokeWidth} A ${radius},${radius} 0 0 1 ${radius * 2 + strokeWidth},${radius + strokeWidth}`}
            stroke="#059669"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${circumference}`}
            strokeDashoffset={strokeDashoffset}
            style={{ transform: [{ rotate: '180deg' }], transformOrigin: 'center' }}
          />
        </Svg>
      </View>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <Text style={{ fontSize: 56, fontWeight: '800', color: theme.colors.text }}>{percentage}%</Text>
      </View>
    </View>
  );
};

export const Pagina_principal = () => {
  const { theme, isDarkMode } = useTheme();
  const [solarValue] = useState('840W/m²');
  const [humidityValue] = useState('42%');
  const [modalVisible, setModalVisible] = useState(false);
  
  const [region, setRegion] = useState('Seleccionar región');
  const [area, setArea] = useState('');
  const [cropType, setCropType] = useState('Seleccionar cultivo');
  const [cultivationDate, setCultivationDate] = useState(new Date());
  const [harvestDate, setHarvestDate] = useState(new Date());
  
  const [showCultivationPicker, setShowCultivationPicker] = useState(false);
  const [showHarvestPicker, setShowHarvestPicker] = useState(false);
  const [showCropMenu, setShowCropMenu] = useState(false);
  const crops = ['Trigo'];

  const onCultivationChange = (event, selectedDate) => {
    setShowCultivationPicker(false);
    if (selectedDate) setCultivationDate(selectedDate);
  };

  const onHarvestChange = (event, selectedDate) => {
    setShowHarvestPicker(false);
    if (selectedDate) setHarvestDate(selectedDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  const styles = getStyles(theme, isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Simulación de Campo Card */}
        <View style={styles.mainCard}>
          <ImageBackground 
            source={require('../../../assets/farm_simulation.jpg')}
            style={styles.cardImageBackground}
            imageStyle={{ borderRadius: 32 }}
          >
            <LinearGradient
              colors={['rgba(13, 27, 42, 0.2)', 'rgba(13, 27, 42, 0.7)']}
              style={styles.cardGradientOverlay}
            >
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>EN VIVO</Text>
              </View>
              
              <Text style={styles.simTitle}>Simulación de Campo</Text>

              <View style={styles.statsPillsRow}>
                <View style={styles.statPill}>
                  <View style={styles.pillIconContainer}>
                    <Sun color={theme.colors.primary} size={14} />
                  </View>
                  <View>
                    <Text style={styles.pillLabel}>SOLAR</Text>
                    <Text style={styles.pillValue}>{solarValue}</Text>
                  </View>
                </View>

                <View style={styles.statPill}>
                  <View style={styles.pillIconContainer}>
                    <Droplet color="#3B82F6" size={14} />
                  </View>
                  <View>
                    <Text style={styles.pillLabel}>HUMEDAD</Text>
                    <Text style={styles.pillValue}>{humidityValue}</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
        </View>

        {/* Salud del Ecosistema */}
        <Card style={styles.infoCard}>
          <Text style={styles.cardPreTitle}>SALUD DEL ECOSISTEMA</Text>
          <View style={styles.efficiencyRow}>
            <Text style={styles.efficiencyValue}>98%</Text>
            <Text style={styles.efficiencyLabel}>Eficiencia Óptima</Text>
          </View>
          <Text style={styles.cardDesc}>
            Cultivos de maíz en pico de fotosíntesis con absorción de nutrientes detectada.
          </Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '98%' }]} />
          </View>
        </Card>

        {/* Sugerencias IA */}
        <TouchableOpacity activeOpacity={0.9} style={styles.aiCard}>
          <View style={styles.aiHeader}>
            <View style={styles.aiIconWrapper}>
              <LayoutGrid color="#FFF" size={16} />
            </View>
            <Text style={styles.aiTitle}>SUGERENCIAS IA</Text>
          </View>
          <Text style={styles.aiSubtitle}>Ventana Recomendada</Text>
          <Text style={styles.aiMainText}>Riego óptimo:{'\n'}6:00 AM - 8:00 AM</Text>
          <Text style={styles.aiFooterText}>
            Mejor retención hídrica (+12%) basada en pérdida evaporativa y viento.
          </Text>
          
          <View style={styles.aiDecoration}>
            <Svg width="100" height="100" viewBox="0 0 100 100">
              <Path 
                d="M 100 0 A 100 100 0 0 0 0 100" 
                fill="none" 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="20" 
              />
            </Svg>
          </View>
        </TouchableOpacity>

        {/* Humedad del Suelo */}
        <Card style={styles.gaugeCard}>
          <View style={styles.gaugeHeader}>
            <View>
              <Text style={styles.gaugeTitle}>Humedad del Suelo</Text>
              <Text style={styles.gaugeSubtitle}>Sonda en tiempo real</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>ÓPTIMO</Text>
            </View>
          </View>

          <SemiCircleGauge percentage={75} theme={theme} isDarkMode={isDarkMode} />

          <View style={styles.gaugeFooter}>
            <Text style={styles.gaugeFooterText}>Seco</Text>
            <Text style={styles.gaugeFooterText}>Húmedo</Text>
          </View>
        </Card>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Floating Plus Button */}
      <View style={styles.floatingContainer}>
        <View style={styles.plusTooltip}>
          <Text style={styles.tooltipText}>Nuevo Lote</Text>
        </View>
        <TouchableOpacity 
          style={styles.floatingButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Plus color="#FFF" size={32} />
        </TouchableOpacity>
      </View>

      {/* Add New Field Modal (kept from before) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContainer}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHandle} />
              
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Nuevo Lote</Text>
                  <Text style={styles.modalSubtitle}>Configura los parámetros para tu nueva zona de cultivo.</Text>
                </View>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <X color={theme.colors.textSecondary} size={24} />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>REGIÓN / SECTOR</Text>
                  <TouchableOpacity style={styles.selectInput}>
                    <Text style={styles.selectText}>{region}</Text>
                    <ChevronDown color={theme.colors.textSecondary} size={20} />
                  </TouchableOpacity>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>SUPERFICIE DEL LOTE</Text>
                  <View style={styles.textInputWrapper}>
                    <TextInput 
                      style={styles.textInput}
                      placeholder="Ej. 15.5"
                      placeholderTextColor={theme.colors.textSecondary}
                      keyboardType="numeric"
                      value={area}
                      onChangeText={setArea}
                    />
                    <Text style={styles.inputUnit}>HECTÁREAS</Text>
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>TIPO DE CULTIVO</Text>
                  <TouchableOpacity 
                    style={styles.selectInput}
                    onPress={() => setShowCropMenu(!showCropMenu)}
                  >
                    <Text style={styles.selectText}>{cropType}</Text>
                    <ChevronDown color={theme.colors.textSecondary} size={20} />
                  </TouchableOpacity>
                  {showCropMenu && (
                    <View style={styles.menuContainer}>
                      {crops.map(crop => (
                        <TouchableOpacity 
                          key={crop} 
                          style={styles.menuItem}
                          onPress={() => {
                            setCropType(crop);
                            setShowCropMenu(false);
                          }}
                        >
                          <Text style={styles.menuItemText}>{crop}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                <View style={styles.datesRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>FECHA DE SIEMBRA</Text>
                    <TouchableOpacity 
                      style={styles.dateInput}
                      onPress={() => setShowCultivationPicker(true)}
                    >
                      <Text style={styles.dateText}>{formatDate(cultivationDate)}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>EST. COSECHA</Text>
                    <TouchableOpacity 
                      style={styles.dateInput}
                      onPress={() => setShowHarvestPicker(true)}
                    >
                      <Text style={styles.dateText}>{formatDate(harvestDate)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {showCultivationPicker && (
                  <DateTimePicker
                    value={cultivationDate}
                    mode="date"
                    display="default"
                    onChange={onCultivationChange}
                  />
                )}

                {showHarvestPicker && (
                  <DateTimePicker
                    value={harvestDate}
                    mode="date"
                    display="default"
                    onChange={onHarvestChange}
                  />
                )}

                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.submitButtonText}>Registrar Lote</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
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
  scrollContainer: {
    padding: 24,
  },
  mainCard: {
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 24,
    height: 240,
    ...theme.shadows.soft,
  },
  cardImageBackground: {
    flex: 1,
  },
  cardGradientOverlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  liveBadge: {
    backgroundColor: '#065F46',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  liveBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  simTitle: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 8,
  },
  statsPillsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statPill: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillLabel: {
    fontSize: 7,
    fontWeight: '700',
    color: '#6B7280',
  },
  pillValue: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
  },
  infoCard: {
    padding: 24,
    marginBottom: 24,
  },
  cardPreTitle: {
    fontSize: 10,
    fontWeight: '800',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 8,
  },
  efficiencyRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 12,
  },
  efficiencyValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#065F46',
  },
  efficiencyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  cardDesc: {
    fontSize: 14,
    color: theme.colors.text,
    lineHeight: 20,
    marginBottom: 20,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: isDarkMode ? '#1E293B' : '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#065F46',
  },
  aiCard: {
    backgroundColor: '#064E3B',
    borderRadius: 32,
    padding: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  aiIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  aiSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    marginBottom: 4,
  },
  aiMainText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
    marginBottom: 20,
  },
  aiFooterText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    lineHeight: 18,
  },
  aiDecoration: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  gaugeCard: {
    padding: 24,
    marginBottom: 24,
  },
  gaugeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  gaugeTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.text,
  },
  gaugeSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: '#065F46',
    fontSize: 10,
    fontWeight: '800',
  },
  gaugeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  gaugeFooterText: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  floatingContainer: {
    position: 'absolute',
    bottom: 30,
    right: 24,
    alignItems: 'center',
    gap: 12,
  },
  plusTooltip: {
    backgroundColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  tooltipText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  floatingButton: {
    backgroundColor: '#065F46',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadows.glow,
  },
  // Modal Styles (Keeping existing modal styles)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    minHeight: '60%',
  },
  modalHandle: {
    width: 40,
    height: 4,
    backgroundColor: theme.colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: theme.colors.primary,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    maxWidth: '85%',
  },
  formContent: {
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    letterSpacing: 1,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  selectText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors.text,
  },
  inputUnit: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    backgroundColor: theme.colors.surfaceHighlight,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 4,
  },
  menuItem: {
    padding: 12,
    borderRadius: 8,
  },
  menuItemText: {
    color: theme.colors.text,
    fontSize: 16,
  }
});
