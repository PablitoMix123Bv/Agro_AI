import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Bell, Droplets, Clock, FileText, Leaf, RefreshCw, RefreshCcw } from 'lucide-react-native';
import { Svg, Path } from 'react-native-svg';

export const StatsScreen = () => {
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

        {/* Titles and Actions */}
        <View style={styles.titleSection}>
          <Text style={styles.preTitle}>MOTOR DE ANÁLISIS</Text>
          <Text style={styles.mainTitle}>Rendimiento del Campo</Text>
          
          <View style={styles.actionRow}>
            <Button 
              title="Exportar PDF" 
              variant="outline" 
              style={styles.actionButtonOutline}
              textStyle={styles.actionButtonText}
            />
            <Button 
              title="Actualizar Datos" 
              variant="primary" 
              style={styles.actionButtonPrimary}
            />
          </View>
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
             {/* Mocking a line chart using SVG */}
            <Svg height="120" width="100%" viewBox="0 0 300 120">
              <Path 
                d="M 0 80 Q 30 60 60 80 T 120 100 T 180 30 T 240 80 T 300 40 L 300 120 L 0 120 Z" 
                fill="rgba(16, 185, 129, 0.1)" 
              />
              <Path 
                d="M 0 80 Q 30 60 60 80 T 120 100 T 180 30 T 240 80 T 300 40" 
                fill="none" 
                stroke={theme.colors.primaryDark} 
                strokeWidth="3" 
              />
            </Svg>
            <View style={styles.chartXAxis}>
              <Text style={styles.axisText}>LUN</Text>
              <Text style={styles.axisText}>MAR</Text>
              <Text style={styles.axisText}>MIÉ</Text>
              <Text style={styles.axisText}>JUE</Text>
              <Text style={styles.axisText}>VIE</Text>
              <Text style={styles.axisText}>SÁB</Text>
              <Text style={styles.axisText}>DOM</Text>
            </View>
          </View>
        </Card>

        {/* Water Usage Chart Card */}
        <Card style={styles.chartCard}>
          <Text style={styles.chartTitle}>Uso Semanal de Agua</Text>
          <Text style={styles.chartSubtitle}>Litros por hectárea (L/ha)</Text>
          
          <View style={[styles.chartPlaceholder, { marginTop: 20 }]}>
            {/* Just an empty space for the bars to be added later */}
            <View style={{height: 100}} />
            <View style={styles.chartXAxis}>
              <Text style={styles.axisText}>L</Text>
              <Text style={styles.axisText}>M</Text>
              <Text style={styles.axisText}>X</Text>
              <Text style={styles.axisText}>J</Text>
              <Text style={styles.axisText}>V</Text>
              <Text style={styles.axisText}>S</Text>
              <Text style={styles.axisText}>D</Text>
            </View>
          </View>
        </Card>

        {/* Irrigation History */}
        <Card style={styles.historyCard}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Historial de Riego</Text>
            <Clock color={theme.colors.primaryDark} size={18} />
          </View>

          <HistoryItem 
            title="Huerta Norte Sector A"
            time="Hoy, 09:30 AM • 450L"
            type="AUTO"
          />
          <HistoryItem 
            title="Invernadero Lote B"
            time="Ayer, 10:15 PM • 120L"
            type="MANUAL"
          />
          <HistoryItem 
            title="Viñedo Principal Fila 4-8"
            time="Ayer, 04:00 AM • 890L"
            type="AUTO"
            isLast
          />

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>Ver Toda la Actividad</Text>
          </TouchableOpacity>
        </Card>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const HistoryItem = ({ title, time, type, isLast }) => {
  const isAuto = type === 'AUTO';
  return (
    <View style={[styles.historyItem, !isLast && styles.historyItemBorder]}>
      <View style={styles.historyIconWrapper}>
        <Droplets color="#3B82F6" size={16} />
      </View>
      <View style={styles.historyContent}>
        <Text style={styles.historyItemTitle}>{title}</Text>
        <Text style={styles.historyItemTime}>{time}</Text>
      </View>
      <View style={[styles.badge, isAuto ? styles.badgeAuto : styles.badgeManual]}>
        <Text style={[styles.badgeText, isAuto ? styles.badgeTextAuto : styles.badgeTextManual]}>{type}</Text>
      </View>
    </View>
  );
};

const UserPlaceholder = () => (
  <Image 
    source={require('../../../assets/logo.png')}
    style={{ width: 32, height: 32, borderRadius: 8 }} 
  />
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
  titleSection: {
    marginBottom: theme.spacing.lg,
  },
  preTitle: {
    color: theme.colors.danger,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 4,
  },
  mainTitle: {
    color: theme.colors.text,
    fontSize: 32, // Large title from design
    fontWeight: 'bold',
    lineHeight: 36,
    marginBottom: theme.spacing.md,
  },
  actionRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  actionButtonOutline: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100, // Pill shape
  },
  actionButtonPrimary: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 100, // Pill shape
  },
  actionButtonText: {
    fontSize: 13,
  },
  efficiencyCard: {
    backgroundColor: '#2E7D32', // Dark green from design
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
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
    backgroundColor: '#F3E8D6', // Light beige
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  daysBadgeText: {
    color: '#8A6D3B',
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
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  historyIconWrapper: {
    backgroundColor: '#EFF6FF', // Light blue
    padding: 10,
    borderRadius: 12,
    marginRight: theme.spacing.md,
  },
  historyContent: {
    flex: 1,
  },
  historyItemTitle: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  historyItemTime: {
    color: theme.colors.textSecondary,
    fontSize: 11,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeAuto: {
    backgroundColor: '#DCFCE7', // Light green
  },
  badgeManual: {
    backgroundColor: '#F3E8D6', // Light beige
  },
  badgeText: {
    fontSize: 9,
    fontWeight: 'bold',
  },
  badgeTextAuto: {
    color: '#166534',
  },
  badgeTextManual: {
    color: '#8A6D3B',
  },
  viewAllButton: {
    alignItems: 'center',
    marginTop: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
  },
  viewAllText: {
    color: theme.colors.primaryDark,
    fontWeight: 'bold',
    fontSize: 13,
  }
});
