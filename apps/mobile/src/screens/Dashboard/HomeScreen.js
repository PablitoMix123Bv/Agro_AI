import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { theme } from '../../theme/theme';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { Droplets, Thermometer, Wind, Sprout, BrainCircuit } from 'lucide-react-native';

export const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hola, Agricultor</Text>
            <Text style={styles.subtitle}>Tu cultivo está en estado óptimo</Text>
          </View>
          <View style={styles.avatarPlaceholder} />
        </View>

        {/* AI Insight Card */}
        <Card variant="glow" style={styles.insightCard}>
          <View style={styles.insightHeader}>
            <BrainCircuit color={theme.colors.primary} size={24} />
            <Text style={styles.insightTitle}>AgroSmart AI Insight</Text>
          </View>
          <Text style={styles.insightText}>
            Basado en las proyecciones climáticas, se recomienda retrasar el riego 2 horas. Probabilidad de lluvia: 85%.
          </Text>
          <Button title="Aplicar recomendación" style={{marginTop: theme.spacing.md}} />
        </Card>

        {/* Quick Stats Grid */}
        <View style={styles.grid}>
          <Card style={styles.gridItem}>
            <Droplets color="#3B82F6" size={32} />
            <Text style={styles.statValue}>42%</Text>
            <Text style={styles.statLabel}>Humedad Suelo</Text>
          </Card>
          
          <Card style={styles.gridItem}>
            <Thermometer color="#EF4444" size={32} />
            <Text style={styles.statValue}>24°C</Text>
            <Text style={styles.statLabel}>Temperatura</Text>
          </Card>

          <Card style={styles.gridItem}>
            <Wind color="#8B5CF6" size={32} />
            <Text style={styles.statValue}>12 km/h</Text>
            <Text style={styles.statLabel}>Viento</Text>
          </Card>

          <Card style={styles.gridItem}>
            <Sprout color={theme.colors.primary} size={32} />
            <Text style={styles.statValue}>Fase 3</Text>
            <Text style={styles.statLabel}>Crecimiento</Text>
          </Card>
        </View>

      </ScrollView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    marginTop: theme.spacing.md,
  },
  greeting: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.sm,
    marginTop: theme.spacing.xs,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.round,
    backgroundColor: theme.colors.surface,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  insightCard: {
    marginBottom: theme.spacing.xl,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  insightTitle: {
    color: theme.colors.primary,
    fontSize: theme.typography.sizes.md,
    fontWeight: 'bold',
  },
  insightText: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.sm,
    lineHeight: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '47%',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  statValue: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.xl,
    fontWeight: 'bold',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  statLabel: {
    color: theme.colors.textSecondary,
    fontSize: theme.typography.sizes.xs,
  }
});
