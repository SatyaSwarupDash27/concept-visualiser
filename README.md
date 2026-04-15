# Concept Visualiser

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge&logo=vercel)](https://concept-visualiser.vercel.app)

Concept Visualiser is a high-performance, deterministic simulation engine designed for exploring the step-by-step logic of Data Structures, Algorithms, and Operating Systems concepts. Built with a focus on educational clarity and architectural precision, it allows students and developers to visualize abstract computing mechanics in real-time.

## Key Features

- **Deterministic Visualization**: Every simulation state is computed and tracked, allowing for precise playback control (Pause, Step, Rewind).
- **Domain Coverage**: Comprehensive modules for both DSA (Sorting, Graphs, Trees, Strings) and OS (CPU Scheduling, Memory Management, Synchronization).
- **Interactive Configuration**: Real-time adjustment of algorithm inputs and system parameters.
- **Knowledge Analytics**: Context-aware metrics and algorithm metadata displayed alongside the visual state.
- **Modern UI/UX**: Professional-grade interface featuring high-fidelity animations and a standard-compliant design system.

## Technical Architecture

The platform is architected as a decoupled system featuring a central simulation engine and pluggable algorithm modules:

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.0
- **State Management**: Zustand
- **Graphics**: React Konva (for complex canvas benchmarks)
- **Animation**: Framer Motion
- **Tooling**: Vite 8.0

## Repository Structure

```text
src/
├── algorithms/      # Generator logic and plugin definitions
│   ├── dsa/         # Data Structures and Algorithms modules
│   └── os/          # Operating Systems internal modules
├── core/            # Simulation engine, store, and type definitions
│   ├── engine/      # Snapshot-driven runner and metrics tracker
│   ├── registry/    # Plugin discovery and registration
│   └── store/       # Central playback and metrics state
├── ui/              # Global layout and dashboard panels
├── visualizers/     # React visualization components for every domain
└── workers/         # Background processing for heavy simulations
```

## Local Installation

To set up the development environment locally, follow these steps:

### Prerequisites

- **Node.js**: Version 18.0 or higher is recommended.
- **npm**: Version 9.0 or higher.

### Steps

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd cs-visualiser
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:5173`.

## Deployment

The application is optimized for deployment on **Vercel**:

1. Click **New Project** in the Vercel Dashboard.
2. Connect your Git repository.
3. Use the following build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Deploy.

## License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for the full terms of the license.

---
*Built with high fidelity for the next generation of computer scientists.*
