import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Droplets, Settings2, Clock } from 'lucide-react-native';

export const IrrigationScreen = () => {
  const [isAutoMode, setIsAutoMode] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Control de Riego</Text>
        </View>

        <Card style={styles.modeCard}>
          <View style={styles.modeHeader}>
            <View style={styles.modeTitleContainer}>
              <Settings2 color={theme.colors.primary} size={24} />
              <Text style={styles.modeTitle}>Modo IA Automático</Text>
            </View>
            <Switch
              value={isAutoMode}
              onValueChange={setIsAutoMode}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
              thumbColor={theme.colors.text}
            />
          </View>
          <Text style={styles.modeDescription}>
            {isAutoMode 
              ? "AgroSmart AI está gestionando el riego basado en sensores y clima."
              : "Modo manual activo. Tú controlas cuándo y cuánto regar."}
          </Text>
        </Card>

        <Card variant={!isAutoMode ? 'glow' : 'default'} style={styles.actionCard}>
          <View style={styles.actionHeader}>
            <Droplets color={theme.colors.text} size={32} />
            <Text style={styles.actionTitle}>Riego Manual</Text>
          </View>
          <Text style={styles.actionStatus}>Estado: Apagado</Text>
          <Button 
            title="Iniciar Riego (30 min)" 
            disabled={isAutoMode}
            variant={isAutoMode ? 'outline' : 'primary'}
            style={{marginTop: theme.spacing.lg}}
          />
        </Card>

        <Card style={styles.scheduleCard}>
          <View style={styles.scheduleHeader}>
            <Clock color={theme.colors.text} size={20} />
            <Text style={styles.scheduleTitle}>Próximos Riegos (IA)</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>Hoy, 18:00</Text>
            <Text style={styles.scheduleDuration}>45 mins</Text>
          </View>
          <View style={styles.scheduleItem}>
            <Text style={styles.scheduleTime}>Mañana, 06:00</Text>
            <Text style={styles.scheduleDuration}>30 mins</Text>
          </View>
        </Card>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.lg,
    flex: 1,
  },
  header: {
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
  },
  modeCard: {
    marginBottom: theme.spacing.lg,
  },
  modeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  modeTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  modeTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
  },
  modeDescription: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    marginTop: theme.spacing.sm,
  },
  actionCard: {
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  actionHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  actionTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.lg,
    fontWeight: 'bold',
    marginTop: theme.spacing.sm,
  },
  actionStatus: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.md,
  },
  scheduleCard: {
    marginTop: theme.spacing.sm,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  scheduleTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: '600',
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  scheduleTime: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
  },
  scheduleDuration: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.sm,
    fontWeight: '600',
  }
});
