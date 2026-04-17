import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { AlertTriangle, BrainCircuit, CheckCircle2, Clock, Droplets, Thermometer, FlaskConical, CloudRain, Sprout } from 'lucide-react-native';

export const AlertsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brandInfo}>
            <Sprout color={theme.colors.primaryDark} size={20} />
            <Text style={styles.brandName}>Agro AI</Text>
          </View>
          <View style={styles.avatar}>
             <UserPlaceholder />
          </View>
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.preTitle}>MONITORIZACIÓN EN TIEMPO REAL</Text>
          <Text style={styles.mainTitle}>Feed de Inteligencia</Text>
        </View>

        {/* Critical Alert */}
        <Card style={[styles.alertCard, styles.criticalAlert]}>
          <View style={styles.alertHeader}>
            <AlertTriangle color={theme.colors.danger} size={16} />
            <Text style={styles.criticalText}>ALERTA CRÍTICA</Text>
          </View>
          <Text style={styles.alertTitle}>Suelo demasiado seco en Lote B</Text>
          <Text style={styles.alertDescription}>
            Los niveles de humedad han descendido por debajo del 12%. Se requiere acción inmediata para evitar estrés hídrico en el cultivo.
          </Text>
          <Button 
            title="Iniciar Riego" 
            variant="primary" 
            icon={<Droplets color="#FFF" size={16} />}
            style={styles.alertButton}
          />
        </Card>

        {/* AI Suggestion */}
        <Card style={styles.suggestionCard}>
          <View style={styles.suggestionHeader}>
            <View style={styles.suggestionIconWrapper}>
              <BrainCircuit color={theme.colors.primaryDark} size={20} />
            </View>
            <BrainCircuit color="rgba(255,255,255,0.1)" size={64} style={styles.bgIcon} />
          </View>
          <Text style={styles.suggestionTitle}>Optimización sugerida por IA</Text>
          <Text style={styles.suggestionDescription}>
            Regar mañana a las 5:00 AM para maximizar la absorción y reducir la evaporación según el pronóstico térmico.
          </Text>
          <Button 
            title="PROGRAMAR TAREA" 
            style={styles.suggestionButton}
          />
        </Card>

        {/* System Status */}
        <Card style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusTitle}>Estado del Sistema</Text>
            <View style={styles.badgeSuccess}>
              <Text style={styles.badgeSuccessText}>Actualizado hace 2 min</Text>
            </View>
          </View>

          <View style={styles.timeline}>
            <TimelineItem 
              title="Sincronización de datos exitosa"
              description="Todos los sensores de campo están transmitiendo correctamente."
              time="10:45 AM"
              isFirst
            />
            <TimelineItem 
              title="Mantenimiento completado"
              description="Puerta de enlace satelital reiniciada y firmware actualizado."
              time="08:12 AM"
            />
            <TimelineItem 
              title="Copia de seguridad semanal"
              description="Los registros históricos de suelo han sido respaldados en la nube."
              time="AYER"
              isLast
            />
          </View>
        </Card>

        {/* Quick Metrics */}
        <View style={styles.metricsContainer}>
          <MetricRow 
            label="HUMEDAD LOTE B"
            value="11%"
            valueColor={theme.colors.danger}
            icon={<AlertTriangle color={theme.colors.danger} size={16} style={{transform: [{rotate: '180deg'}]}} />}
          />
          <MetricRow 
            label="TEMPERATURA SUELO"
            value="24°C"
            icon={<CheckCircle2 color={theme.colors.primary} size={16} />}
          />
          <MetricRow 
            label="NUTRIENTES NPK"
            value="Óptimo"
            icon={<FlaskConical color={theme.colors.primaryDark} size={16} />}
          />
          <MetricRow 
            label="PREVISIÓN LLUVIA"
            value="5%"
            icon={<CloudRain color={theme.colors.textSecondary} size={16} />}
          />
        </View>

        <View style={{height: 20}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const TimelineItem = ({ title, description, time, isFirst, isLast }) => (
  <View style={styles.timelineItem}>
    <View style={styles.timelineGraphic}>
      <View style={[styles.timelineDot, isLast && styles.timelineDotInactive]} />
      {!isLast && <View style={styles.timelineLine} />}
    </View>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineTitle}>{title}</Text>
      <Text style={styles.timelineDesc}>{description}</Text>
    </View>
    <Text style={styles.timelineTime}>{time}</Text>
  </View>
);

const MetricRow = ({ label, value, valueColor, icon }) => (
  <View style={styles.metricRow}>
    <View>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={[styles.metricValue, valueColor && { color: valueColor }]}>{value}</Text>
    </View>
    {icon}
  </View>
);

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
    marginBottom: theme.spacing.lg,
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
  titleContainer: {
    marginBottom: theme.spacing.lg,
  },
  preTitle: {
    color: theme.colors.primaryDark,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  mainTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
  },
  alertCard: {
    borderLeftWidth: 4,
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.lg,
  },
  criticalAlert: {
    borderLeftColor: theme.colors.danger,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  criticalText: {
    color: theme.colors.danger,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  alertTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.xs,
  },
  alertDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  alertButton: {
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.sm,
  },
  suggestionCard: {
    backgroundColor: '#3F522F', // Dark olive green from design
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.xl,
    borderWidth: 0,
    overflow: 'hidden',
  },
  suggestionHeader: {
    marginBottom: theme.spacing.md,
  },
  suggestionIconWrapper: {
    backgroundColor: '#D9F99D', // Light lime
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  bgIcon: {
    position: 'absolute',
    right: -20,
    top: -20,
  },
  suggestionTitle: {
    color: '#FFF',
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    marginBottom: theme.spacing.sm,
  },
  suggestionDescription: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: theme.typography.sizes.sm,
    lineHeight: 20,
    marginBottom: theme.spacing.lg,
  },
  suggestionButton: {
    backgroundColor: '#D9F99D',
  },
  statusCard: {
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.lg,
  },
  statusTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
    width: '60%',
  },
  badgeSuccess: {
    backgroundColor: '#bbf7d0', // Light green
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeSuccessText: {
    color: theme.colors.primaryDark,
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeline: {
    marginLeft: 8,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  timelineGraphic: {
    width: 20,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
  },
  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primaryDark,
    zIndex: 1,
  },
  timelineDotInactive: {
    backgroundColor: theme.colors.border,
  },
  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: theme.colors.border,
    marginTop: -4,
    marginBottom: -12,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  timelineDesc: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    lineHeight: 16,
  },
  timelineTime: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    marginLeft: theme.spacing.sm,
  },
  metricsContainer: {
    gap: theme.spacing.sm,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  metricLabel: {
    color: theme.colors.textSecondary,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  metricValue: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
  }
});
