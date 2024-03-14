const particleOptions = {
    background: {
        color: {
            value: "transparent",
        },
    },
    fpsLimit: 120,
    fullScreen: { enable: false },
    interactivity: {
        events: {
            onClick: {
                enable: false,
                mode: "push",
            },
            onHover: {
                enable: false,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            push: {
                quantity: 4,
            },
            repulse: {
                distance: 200,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: "#00FF00",
        },
        links: {
            color: "#33b1f8",
            distance: 200,
            enable: true,
            opacity: 0.5,
            width: 0.2,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: false,
            speed: 0.3,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 200,
        },
        opacity: {
            value: 0.5,
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 0.5, max: 1 },
        },
    },
    detectRetina: true,
};

export default particleOptions;