import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  PanResponder,
  Animated
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Bell, Sun, Droplet, Plus, BrainCircuit, User, X, ChevronDown, Tractor, Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path, Circle } from 'react-native-svg';

// Custom Semi-Circle Gauge Component
const SemiCircleGauge = ({ percentage }) => {
  const radius = 60;
  const strokeWidth = 14; // Slightly thicker for better visibility
  const halfCircle = radius + strokeWidth;
  const circumference = radius * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Dynamic Color Logic
  const getColor = (pct) => {
    if (pct >= 70) return '#166534'; // Óptimo (Verde)
    if (pct >= 40) return '#F59E0B'; // Bajo (Amarillo/Naranja)
    return '#EF4444'; // Crítico (Rojo)
  };

  const color = getColor(percentage);

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', height: 160 }}>
      <View style={{ height: radius + strokeWidth, width: (radius + strokeWidth) * 2, overflow: 'hidden' }}>
        <Svg width={(radius + strokeWidth) * 2} height={(radius + strokeWidth) * 2}>
          {/* Background Track */}
          <Path
            d={`M ${strokeWidth},${radius + strokeWidth} A ${radius},${radius} 0 0 1 ${radius * 2 + strokeWidth},${radius + strokeWidth}`}
            stroke="#E5E7EB"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            style={{ transform: [{ rotate: '180deg' }], transformOrigin: 'center' }}
          />
          {/* Progress Track */}
          <Path
            d={`M ${strokeWidth},${radius + strokeWidth} A ${radius},${radius} 0 0 1 ${radius * 2 + strokeWidth},${radius + strokeWidth}`}
            stroke={color}
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
        <Text style={{ fontSize: 56, fontWeight: '800', color: '#111827' }}>{percentage}%</Text>
      </View>
    </View>
  );
};

export const Pagina_principal = () => {
  const [solarValue, setSolarValue] = useState('840W/m²');
  const [humidityValue, setHumidityValue] = useState('42%');
  
  // Modal State
  const [modalVisible, setModalVisible] = useState(false);
  
  // Crop Menu State
  const [showCropMenu, setShowCropMenu] = useState(false);
  const crops = ['Trigo'];
  
  // Form State
  const [region, setRegion] = useState('Seleccionar región');
  const [area, setArea] = useState('');
  const [cropType, setCropType] = useState('Seleccionar cultivo');
  const [cultivationDate, setCultivationDate] = useState(new Date());
  const [harvestDate, setHarvestDate] = useState(new Date());
  
  // Date Picker States
  const [showCultivationPicker, setShowCultivationPicker] = useState(false);
  const [showHarvestPicker, setShowHarvestPicker] = useState(false);

  const onCultivationChange = (event, selectedDate) => {
    setShowCultivationPicker(false);
    if (selectedDate) setCultivationDate(selectedDate);
  };

  const onHarvestChange = (event, selectedDate) => {
    setShowHarvestPicker(false);
    if (selectedDate) setHarvestDate(selectedDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });
  };

  // Swipe to close logic
  const panY = useState(new Animated.Value(0))[0];
  const panResponder = useState(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dy > 100) {
          setModalVisible(false);
          Animated.timing(panY, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  )[0];

  const modalAnimatedStyle = {
    transform: [{ translateY: panY }],
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Custom Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar}>
            <User color="#FFFFFF" size={20} />
          </View>
          <Text style={styles.headerTitle}>Agro IA</Text>
        </View>
      </View>
      <View style={styles.headerBorder} />

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Card 1: Simulación de Campo */}
        <View style={styles.cardWrapper}>
          <LinearGradient
            colors={['#1F4037', '#105646']} // Dark green background for simulation
            style={styles.simCard}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
          >
            <View style={styles.badgeLive}>
              <Text style={styles.badgeLiveText}>EN VIVO</Text>
            </View>
            <Text style={styles.simTitle}>Simulación de Campo</Text>
            
            <View style={styles.simMetrics}>
              <View style={styles.glassBox}>
                <View style={styles.glassRow}>
                  <Sun color="#111827" size={12} />
                  <Text style={styles.glassLabel}>SOLAR</Text>
                </View>
                <Text style={styles.glassValue}>{solarValue}</Text>
              </View>
              
              <View style={styles.glassBox}>
                <View style={styles.glassRow}>
                  <Droplet color="#111827" size={12} />
                  <Text style={styles.glassLabel}>HUMEDAD</Text>
                </View>
                <Text style={styles.glassValue}>{humidityValue}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Card 2: Salud del Ecosistema */}
        <View style={styles.cardLight}>
          <Text style={styles.cardHeaderSmall}>SALUD DEL ECOSISTEMA</Text>
          <View style={styles.healthRow}>
            <Text style={styles.healthBigText}>98%</Text>
            <Text style={styles.healthStatusText}>Eficiencia Óptima</Text>
          </View>
          <Text style={styles.cardDescription}>
            Cultivos de maíz en pico de fotosíntesis con absorción de nutrientes detectada.
          </Text>
          {/* Progress Bar */}
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: '98%' }]} />
          </View>
        </View>

        {/* Card 3: Sugerencias IA */}
        <View style={styles.cardDarkGreen}>
          <View style={styles.iaHeaderRow}>
            <BrainCircuit color="#FFFFFF" size={16} />
            <Text style={styles.iaHeaderText}>SUGERENCIAS IA</Text>
          </View>
          <Text style={styles.iaSubtitle}>Ventana Recomendada</Text>
          <Text style={styles.iaBigText}>Riego óptimo:{'\n'}6:00 AM - 8:00 AM</Text>
          <Text style={styles.iaDescription}>
            Mejor retención hídrica (+12%) basada en pérdida evaporativa y viento.
          </Text>
        </View>

        {/* Card 4: Humedad del Suelo */}
        <View style={styles.cardLight}>
          <View style={styles.soilHeader}>
            <View>
              <Text style={styles.soilTitle}>Humedad del Suelo</Text>
              <Text style={styles.soilSubtitle}>Sonda en tiempo real</Text>
            </View>
            <View style={styles.badgeOptimo}>
              <Text style={styles.badgeOptimoText}>ÓPTIMO</Text>
            </View>
          </View>
          
          <View style={styles.gaugeContainer}>
            <SemiCircleGauge percentage={75} />
            <View style={styles.gaugeLabelsRow}>
              <Text style={styles.gaugeLabelText}>Seco</Text>
              <Text style={styles.gaugeLabelText}>Húmedo</Text>
            </View>
          </View>
        </View>

        {/* Extra padding at bottom for FAB */}
        <View style={{height: 100}} />
      </ScrollView>

      {/* Floating Action Button */}
      <View style={styles.fabContainer}>
        <View style={styles.fabLabel}>
          <Text style={styles.fabLabelText}>Nuevo Lote</Text>
        </View>
        <TouchableOpacity 
          style={styles.fabButton} 
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Plus color="#FFFFFF" size={32} />
        </TouchableOpacity>
      </View>

      {/* Modal Agregar Nueva Parcela */}
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
            <Animated.View 
              style={[styles.modalContent, modalAnimatedStyle]}
              {...panResponder.panHandlers}
            >
              {/* Handle Bar */}
              <View style={styles.modalHandle} />

              {/* Modal Header */}
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>Agregar Nueva Parcela</Text>
                  <Text style={styles.modalSubtitle}>
                    Ingrese los detalles técnicos para iniciar el monitoreo AI.
                  </Text>
                </View>
              </View>

              {/* Form Fields */}
              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.formContent}>
                
                {/* UBICACIÓN */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>UBICACIÓN</Text>
                  <TouchableOpacity style={styles.selectInput}>
                    <Text style={styles.selectText}>{region}</Text>
                    <ChevronDown color="#9CA3AF" size={20} />
                  </TouchableOpacity>
                </View>

                {/* ÁREA */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>ÁREA (HECTÁREAS)</Text>
                  <View style={styles.textInputWrapper}>
                    <TextInput
                      style={styles.textInput}
                      placeholder="0.00"
                      keyboardType="numeric"
                      value={area}
                      onChangeText={setArea}
                      placeholderTextColor="#9CA3AF"
                    />
                    <Text style={styles.inputUnit}>HA</Text>
                  </View>
                </View>

                {/* TIPO DE CULTIVO */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>TIPO DE CULTIVO</Text>
                  <TouchableOpacity 
                    style={styles.selectInput}
                    onPress={() => setShowCropMenu(!showCropMenu)}
                  >
                    <Text style={styles.selectText}>{cropType}</Text>
                    <Tractor color="#9CA3AF" size={20} />
                  </TouchableOpacity>
                  
                  {showCropMenu && (
                    <View style={styles.menuContainer}>
                      {crops.map((crop) => (
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

                {/* FECHAS ROW */}
                <View style={styles.datesRow}>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>FECHA DE CULTIVO</Text>
                    <TouchableOpacity 
                      style={styles.dateInput}
                      onPress={() => setShowCultivationPicker(true)}
                    >
                      <Text style={styles.dateText}>{formatDate(cultivationDate)}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>PREVISTA COSECHA</Text>
                    <TouchableOpacity 
                      style={styles.dateInput}
                      onPress={() => setShowHarvestPicker(true)}
                    >
                      <Text style={styles.dateText}>{formatDate(harvestDate)}</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Submit Button */}
                <TouchableOpacity 
                  style={styles.submitButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.submitButtonText}>Registrar Parcela</Text>
                </TouchableOpacity>

                {/* Cancel Link */}
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

              </ScrollView>
            </Animated.View>
          </KeyboardAvoidingView>
        </View>

        {/* DateTime Pickers - Styled as overlay to avoid layout issues */}
        {(showCultivationPicker || showHarvestPicker) && (
          <View style={styles.datePickerOverlay}>
            <View style={styles.datePickerContainer}>
              <View style={styles.datePickerHeader}>
                <TouchableOpacity onPress={() => {
                  setShowCultivationPicker(false);
                  setShowHarvestPicker(false);
                }}>
                  <Text style={styles.datePickerDone}>Listo</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={showCultivationPicker ? cultivationDate : harvestDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={showCultivationPicker ? onCultivationChange : onHarvestChange}
                textColor="#111827"
              />
            </View>
          </View>
        )}
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#166534',
  },
  bellButton: {
    position: 'relative',
    padding: 4,
  },
  redDot: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  headerBorder: {
    height: 2,
    backgroundColor: '#3B82F6', // Blue separator line
    width: '100%',
  },
  scrollContainer: {
    padding: 16,
    gap: 16,
  },
  cardWrapper: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  simCard: {
    padding: 24,
    borderRadius: 24,
    minHeight: 180,
  },
  badgeLive: {
    backgroundColor: '#16A34A',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  badgeLiveText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  simTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  simMetrics: {
    flexDirection: 'row',
    gap: 12,
  },
  glassBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    padding: 12,
  },
  glassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  glassLabel: {
    fontSize: 10,
    color: '#4B5563',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  glassValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#111827',
  },
  cardLight: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
  },
  cardHeaderSmall: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6B7280',
    letterSpacing: 1,
    marginBottom: 12,
  },
  healthRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 8,
  },
  healthBigText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#166534',
  },
  healthStatusText: {
    fontSize: 14,
    color: '#4B5563',
  },
  cardDescription: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
    marginBottom: 16,
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressBarFill: {
    height: 8,
    backgroundColor: '#166534',
    borderRadius: 4,
  },
  cardDarkGreen: {
    backgroundColor: '#166534', // Solid dark green for IA Suggestions
    borderRadius: 24,
    padding: 24,
  },
  iaHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  iaHeaderText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  iaSubtitle: {
    color: '#A7F3D0', // Light green text
    fontSize: 12,
    marginBottom: 4,
  },
  iaBigText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  iaDescription: {
    color: '#D1FAE5', // Light green
    fontSize: 12,
    lineHeight: 18,
  },
  soilHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  soilTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  soilSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  badgeOptimo: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeOptimoText: {
    color: '#166534',
    fontSize: 10,
    fontWeight: 'bold',
  },
  gaugeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  gaugeLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 8,
  },
  gaugeLabelText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  fabContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  fabLabel: {
    backgroundColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 8,
  },
  fabLabelText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  fabButton: {
    backgroundColor: '#166534',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: 'transparent',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#E5E7EB',
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
    color: '#064E3B', // Darker green
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    maxWidth: '85%',
  },
  closeButton: {
    padding: 4,
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
    color: '#374151',
    letterSpacing: 1,
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  selectText: {
    fontSize: 16,
    color: '#4B5563',
  },
  textInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  inputUnit: {
    fontSize: 14,
    fontWeight: '700',
    color: '#9CA3AF',
  },
  datesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateInput: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#4B5563',
  },
  submitButton: {
    backgroundColor: '#064E3B',
    borderRadius: 16,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#064E3B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemText: {
    fontSize: 16,
    color: '#111827',
  },
  datePickerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  datePickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    alignItems: 'center',
  },
  datePickerHeader: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  datePickerDone: {
    color: '#064E3B',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
