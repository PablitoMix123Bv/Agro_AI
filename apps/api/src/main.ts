import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'AgroSmart AI API' });
});

// Import and use modules here
// app.use('/api/auth', authRoutes);
// app.use('/api/iot', iotRoutes);
// app.use('/api/crops', cropsRoutes);
// app.use('/api/gis', gisRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
