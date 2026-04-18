import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { AlertTriangle, BrainCircuit, CheckCircle2, Droplets, Thermometer, FlaskConical, CloudRain, Sprout } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeContext';

import { Header } from '../../components/Header';

export const AlertsScreen = () => {
  const { theme, isDarkMode } = useTheme();
  const styles = getStyles(theme, isDarkMode);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Standard Header */}
        <Header showUser={false} />

        <View style={styles.titleContainer}>
          <Text style={styles.preTitle}>MONITORIZACIÓN EN TIEMPO REAL</Text>
          <Text style={styles.mainTitle}>Feed de Inteligencia</Text>
        </View>

        {/* AI Insight Card */}
        <Card variant="glow" style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <View style={styles.insightIconWrapper}>
              <BrainCircuit color="#FFF" size={20} />
            </View>
            <View>
              <Text style={styles.insightTitle}>Recomendación de IA</Text>
              <Text style={styles.insightTime}>Hace 5 minutos</Text>
            </View>
          </View>
          <Text style={styles.insightText}>
            Detectada anomalía térmica en el Sector B2. Se recomienda iniciar riego preventivo de 10 min para reducir estrés hídrico.
          </Text>
          <Button 
            title="Aplicar Corrección" 
            variant="primary" 
            style={styles.insightButton}
          />
        </Card>

        {/* Alerts List */}
        <Text style={styles.sectionTitle}>Alertas Recientes</Text>
        
        <AlertItem 
          icon={<AlertTriangle color={theme.colors.warning} size={20} />}
          title="Baja Humedad"
          desc="Sector A4 por debajo del 20%"
          time="12:45 PM"
          theme={theme}
        />
        
        <AlertItem 
          icon={<Thermometer color={theme.colors.danger} size={20} />}
          title="Alta Temperatura"
          desc="Invernadero 2 a 35°C"
          time="11:30 AM"
          theme={theme}
        />

        <AlertItem 
          icon={<Droplets color="#3B82F6" size={20} />}
          title="Riego Completado"
          desc="Sector C1 finalizado con éxito"
          time="10:15 AM"
          theme={theme}
          isSuccess
        />

        <AlertItem 
          icon={<CloudRain color="#6366F1" size={20} />}
          title="Pronóstico de Lluvia"
          desc="80% probabilidad para mañana"
          time="09:00 AM"
          theme={theme}
        />

        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const AlertItem = ({ icon, title, desc, time, isSuccess, theme }) => (
  <Card style={styles_item.itemCard}>
    <View style={styles_item.itemRow}>
      <View style={[styles_item.iconWrapper, { backgroundColor: theme.colors.surfaceHighlight }]}>
        {icon}
      </View>
      <View style={styles_item.itemContent}>
        <View style={styles_item.itemHeader}>
          <Text style={[styles_item.itemTitle, { color: theme.colors.text }]}>{title}</Text>
          <Text style={[styles_item.itemTime, { color: theme.colors.textSecondary }]}>{time}</Text>
        </View>
        <Text style={[styles_item.itemDesc, { color: theme.colors.textSecondary }]}>{desc}</Text>
      </View>
      {isSuccess && <CheckCircle2 color={theme.colors.primary} size={18} />}
    </View>
  </Card>
);

const styles_item = StyleSheet.create({
  itemCard: {
    padding: 16,
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrapper: {
    padding: 10,
    borderRadius: 12,
  },
  itemContent: {
    flex: 1,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  itemTime: {
    fontSize: 10,
    fontWeight: '600',
  },
  itemDesc: {
    fontSize: 12,
  }
});

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
    marginBottom: 32,
  },
  brandInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  brandName: {
    color: theme.colors.primary,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  titleContainer: {
    marginBottom: 32,
  },
  preTitle: {
    color: theme.colors.danger,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  mainTitle: {
    color: theme.colors.text,
    fontSize: 32,
    fontWeight: '900',
  },
  insightCard: {
    padding: 20,
    marginBottom: 32,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  insightIconWrapper: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 14,
  },
  insightTitle: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  insightTime: {
    color: theme.colors.textSecondary,
    fontSize: 11,
    fontWeight: '600',
  },
  insightText: {
    color: theme.colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  insightButton: {
    borderRadius: 12,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
  }
});
