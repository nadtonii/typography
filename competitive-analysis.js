// Data for the bar chart
const barData = {
    labels: ['Writing Focus', 'Hiragana/Katakana', 'Kanji Learning', 'Beginner Friendly'],
    datasets: [
        {
            name: 'Kakimasu',
            color: '#BF3F57',
            data: [5, 5, 4, 5]
        },
        {
            name: 'Duolingo',
            color: '#58CC02',
            data: [1, 3, 2, 5]
        },
        {
            name: 'Japanese! by Renzo',
            color: '#4361EE',
            data: [2, 4, 5, 2]
        },
        {
            name: 'LingoDeer',
            color: '#FFA45C',
            data: [3, 4, 3, 4]
        },
        {
            name: 'Kanji Study',
            color: '#2D3748',
            data: [5, 2, 5, 2]
        },
        {
            name: 'HelloTalk',
            color: '#1DA1F2',
            data: [0, 1, 1, 3]
        }
    ]
};

// Bar Chart
class BarChart {
    constructor(canvas, data) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.data = data;
        this.padding = 60;
        this.barPadding = 2;
    }

    draw() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = 400;
        
        const width = this.canvas.width - this.padding * 2;
        const height = this.canvas.height - this.padding * 2;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw axes
        this.ctx.beginPath();
        this.ctx.strokeStyle = '#666';
        this.ctx.moveTo(this.padding, this.padding);
        this.ctx.lineTo(this.padding, this.canvas.height - this.padding);
        this.ctx.lineTo(this.canvas.width - this.padding, this.canvas.height - this.padding);
        this.ctx.stroke();
        
        // Draw labels
        this.ctx.fillStyle = '#666';
        this.ctx.font = '12px Supreme';
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';
        
        for (let i = 0; i <= 5; i++) {
            const y = this.padding + (height - height * i / 5);
            this.ctx.fillText(i, this.padding - 10, y);
            
            this.ctx.beginPath();
            this.ctx.strokeStyle = '#ccc';
            this.ctx.moveTo(this.padding, y);
            this.ctx.lineTo(this.canvas.width - this.padding, y);
            this.ctx.stroke();
        }
        
        // Calculate bar width
        const categoryWidth = width / this.data.labels.length;
        const barWidth = (categoryWidth - this.padding) / this.data.datasets.length;
        
        // Draw bars
        this.data.labels.forEach((label, i) => {
            // Draw label
            this.ctx.save();
            this.ctx.translate(this.padding + categoryWidth * i + categoryWidth / 2, this.canvas.height - this.padding + 10);
            this.ctx.rotate(-Math.PI / 4);
            this.ctx.textAlign = 'right';
            this.ctx.fillStyle = '#666';
            this.ctx.fillText(label, 0, 0);
            this.ctx.restore();
            
            // Draw bars for each dataset
            this.data.datasets.forEach((dataset, j) => {
                const x = this.padding + categoryWidth * i + barWidth * j + this.padding / 2;
                const barHeight = (height * dataset.data[i]) / 5;
                const y = this.canvas.height - this.padding - barHeight;
                
                this.ctx.fillStyle = dataset.color;
                this.ctx.fillRect(x, y, barWidth - this.barPadding, barHeight);
            });
        });
    }
}

// Initialize chart
window.addEventListener('load', () => {
    const barChart = new BarChart(
        document.getElementById('barChart'),
        barData
    );
    
    barChart.draw();
    
    window.addEventListener('resize', () => {
        barChart.draw();
    });
}); 