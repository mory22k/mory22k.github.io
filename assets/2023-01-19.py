import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import scienceplots
import numpy as np
import matplotlib.pyplot as plt

plt.style.use(['science', 'ieee', 'no-latex'])

x = np.linspace(-2, 2, 1000)

y = np.exp(-x**2)

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(x, y)
ax.set_ylim(0, 1.1); ax.set_xlim(-2, 2)
plt.savefig('2023-01-19-1.png', bbox_inches="tight", pad_inches=0.1)

y = np.exp(-np.absolute(x))

fig = plt.figure()
ax = fig.add_subplot(111)
ax.plot(x, y)
ax.set_ylim(0, 1.1); ax.set_xlim(-2, 2)
plt.savefig('2023-01-19-2.png', bbox_inches="tight", pad_inches=0.1)
