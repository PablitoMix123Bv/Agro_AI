import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Droplets, Clock, Leaf, ChevronDown, ChevronUp } from 'lucide-react-native';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from '../../theme/ThemeContext';

export const StatsScreen = () => {
  const { isDarkMode, theme } = useTheme();
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);

  const styles = getStyles(theme, isPerformanceMode, isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode || isPerformanceMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>

        {/* Header */}
        <TouchableOpacity 
          style={styles.header} 
          onPress={() => setIsPerformanceMode(!isPerformanceMode)}
          activeOpacity={0.7}
        >
          <View style={styles.brandInfo}>
            <View style={styles.avatar}>
              <UserPlaceholder isDarkMode={isDarkMode} theme={theme} />
            </View>
            <Text style={styles.brandName}>AgroSmart AI</Text>
          </View>
        </TouchableOpacity>

        {/* Titles Section */}
        <View style={styles.titleSection}>
          <Text style={styles.preTitle}>MOTOR DE ANÁLISIS</Text>
          <Text style={styles.mainTitle}>Rendimiento del Campo</Text>
          
          <Pressable 
            style={({ pressed }) => [
              styles.exportButton,
              pressed && { backgroundColor: theme.colors.primary, borderColor: theme.colors.primary }
            ]}
          >
            {({ pressed }) => (
              <Text style={[
                styles.exportButtonText,
                pressed && { color: '#FFF' }
              ]}>
                Exportar PDF
              </Text>
            )}
          </Pressable>
        </View>

        {/* Efficiency Card (Green) */}
        <View style={styles.efficiencyCard}>
          <View style={styles.efficiencyHeader}>
            <View style={styles.efficiencyIconBg}>
              <Leaf color="#FFF" size={16} />
            </View>
            <Text style={styles.efficiencyTitle}>Eficiencia</Text>
          </View>
          <Text style={styles.efficiencySubtitle}>Métricas de conservación de agua</Text>
          <Text style={styles.efficiencyValue}>+25%</Text>
          <Text style={styles.efficiencyDesc}>de agua ahorrada esta semana en todos los sectores.</Text>
        </View>

        {/* Moisture Chart Card */}
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartTitle}>Tendencias de Humedad del Suelo</Text>
              <Text style={styles.chartSubtitle}>Promedio de 12 sensores activos</Text>
            </View>
            <View style={styles.daysBadge}>
              <Text style={styles.daysBadgeText}>7 DÍAS</Text>
            </View>
          </View>

          <View style={styles.chartPlaceholder}>
            <Svg height="120" width="100%" viewBox="0 0 300 120">
              <Path
                d="M 0 80 Q 30 60 60 80 T 120 100 T 180 30 T 240 80 T 300 40 L 300 120 L 0 120 Z"
                fill={isPerformanceMode ? "rgba(217, 249, 157, 0.2)" : "rgba(46, 125, 50, 0.1)"}
              />
              <Path
                d="M 0 80 Q 30 60 60 80 T 120 100 T 180 30 T 240 80 T 300 40"
                fill="none"
                stroke={isPerformanceMode ? "#D9F99D" : theme.colors.primary}
                strokeWidth="3"
              />
            </Svg>
            <View style={styles.chartXAxis}>
              {['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'].map(day => (
                <Text key={day} style={styles.axisText}>{day}</Text>
              ))}
            </View>
          </View>
        </Card>

        {/* Irrigation History */}
        <Card style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Historial de Riego</Text>
            <Clock color={isPerformanceMode ? "#D9F99D" : theme.colors.primary} size={18} />
          </View>

          <HistoryItem
            title="Huerta Norte Sector A"
            time="Hoy, 09:30 AM • 450L"
            type="AUTO"
            theme={theme}
            isPerformanceMode={isPerformanceMode}
            isDarkMode={isDarkMode}
          />
          <HistoryItem
            title="Invernadero Lote B"
            time="Ayer, 10:15 PM • 120L"
            type="MANUAL"
            theme={theme}
            isPerformanceMode={isPerformanceMode}
            isDarkMode={isDarkMode}
          />
          
          {showFullHistory && (
            <>
              <HistoryItem
                title="Viñedo Principal Fila 4-8"
                time="Ayer, 04:00 AM • 890L"
                type="AUTO"
                theme={theme}
                isPerformanceMode={isPerformanceMode}
                isDarkMode={isDarkMode}
              />
              <HistoryItem
                title="Sector Sur - Parcela C1"
                time="15 Abr, 11:20 PM • 310L"
                type="AUTO"
                theme={theme}
                isPerformanceMode={isPerformanceMode}
                isDarkMode={isDarkMode}
              />
              <HistoryItem
                title="Huerta Familiar"
                time="14 Abr, 07:00 AM • 45L"
                type="MANUAL"
                theme={theme}
                isPerformanceMode={isPerformanceMode}
                isDarkMode={isDarkMode}
              />
            </>
          )}

          <HistoryItem
            title="Viñedo Principal Fila 1-3"
            time="14 Abr, 03:00 AM • 890L"
            type="AUTO"
            isLast={!showFullHistory}
            theme={theme}
            isPerformanceMode={isPerformanceMode}
            isDarkMode={isDarkMode}
          />

          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => setShowFullHistory(!showFullHistory)}
          >
            <Text style={styles.viewAllText}>
              {showFullHistory ? "Ver Menos" : "Ver Toda la Actividad"}
            </Text>
            {showFullHistory ? 
              <ChevronUp color={isPerformanceMode ? "#D9F99D" : theme.colors.primary} size={16} /> : 
              <ChevronDown color={isPerformanceMode ? "#D9F99D" : theme.colors.primary} size={16} />
            }
          </TouchableOpacity>
        </Card>

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const HistoryItem = ({ title, time, type, isLast, theme, isPerformanceMode, isDarkMode }) => {
  const isAuto = type === 'AUTO';
  return (
    <View style={[
      historyStyles.historyItem, 
      !isLast && { borderBottomWidth: 1, borderBottomColor: theme.colors.border },
    ]}>
      <View style={[
        historyStyles.historyIconWrapper, 
        { backgroundColor: theme.colors.surfaceHighlight },
      ]}>
        <Droplets color={isPerformanceMode ? "#D9F99D" : theme.colors.primary} size={16} />
      </View>
      <View style={historyStyles.historyContent}>
        <Text style={[historyStyles.historyItemTitle, { color: theme.colors.text }]}>{title}</Text>
        <Text style={[historyStyles.historyItemTime, { color: theme.colors.textSecondary }]}>{time}</Text>
      </View>
      <View style={[
        historyStyles.badge, 
        isAuto ? { backgroundColor: isDarkMode ? 'rgba(46, 125, 50, 0.2)' : '#DCFCE7' } : { backgroundColor: isDarkMode ? 'rgba(158, 158, 158, 0.1)' : '#F3E8D6' },
      ]}>
        <Text style={[
          historyStyles.badgeText, 
          isAuto ? { color: isDarkMode ? '#81C784' : '#166534' } : { color: isDarkMode ? '#9E9E9E' : '#8A6D3B' },
        ]}>{type}</Text>
      </View>
    </View>
  );
};

const historyStyles = StyleSheet.create({
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  historyIconWrapper: {
    padding: 10,
    borderRadius: 12,
    marginRight: 16,
  },
  historyContent: {
    flex: 1,
  },
  historyItemTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  historyItemTime: {
    fontSize: 11,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
});

const UserPlaceholder = ({ theme }) => (
  <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.colors.surfaceHighlight, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
    <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: theme.colors.textSecondary, alignSelf: 'center', marginTop: 2 }} />
    <View style={{ width: 20, height: 12, borderRadius: 8, backgroundColor: theme.colors.textSecondary, alignSelf: 'center', marginTop: 2 }} />
  </View>
);

const getStyles = (theme, isPerformanceMode, isDarkMode) => StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: isPerformanceMode ? '#064E3B' : theme.colors.background,
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
    color: isPerformanceMode ? '#FFF' : theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  titleSection: {
    marginBottom: theme.spacing.lg,
  },
  preTitle: {
    color: isPerformanceMode ? '#D9F99D' : theme.colors.danger,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainTitle: {
    color: isPerformanceMode ? '#FFF' : theme.colors.text,
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: 8,
  },
  exportButton: {
    backgroundColor: isPerformanceMode ? 'rgba(217, 249, 157, 0.2)' : theme.colors.surfaceHighlight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: isPerformanceMode ? '#D9F99D' : theme.colors.border,
  },
  exportButtonText: {
    color: isPerformanceMode ? '#D9F99D' : theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  efficiencyCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    borderWidth: isPerformanceMode ? 1 : 0,
    borderColor: '#D9F99D',
  },
  efficiencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: 4,
  },
  efficiencyIconBg: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 4,
    borderRadius: 6,
  },
  efficiencyTitle: {
    color: '#FFFFFF',
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  efficiencySubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 11,
    marginBottom: theme.spacing.md,
  },
  efficiencyValue: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  efficiencyDesc: {
    color: '#FFFFFF',
    fontSize: 12,
    lineHeight: 18,
  },
  chartCard: {
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  chartTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  chartSubtitle: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  daysBadge: {
    backgroundColor: isPerformanceMode ? '#D9F99D' : isDarkMode ? 'rgba(158, 158, 158, 0.1)' : '#F3E8D6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  daysBadgeText: {
    color: isPerformanceMode ? '#14532D' : isDarkMode ? '#9E9E9E' : '#8A6D3B',
    fontSize: 10,
    fontWeight: 'bold',
  },
  chartPlaceholder: {
    marginTop: theme.spacing.lg,
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  axisText: {
    color: theme.colors.textSecondary,
    fontSize: 9,
    fontWeight: 'bold',
  },
  historyCard: {
    padding: theme.spacing.lg,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  historyTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  viewAllText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  }
});
