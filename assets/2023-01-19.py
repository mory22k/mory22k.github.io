import os
import sys

sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

import matplotlib_default
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-2, 2, 1000)

y = np.exp(-x**2)

fig = plt.figure(figsize=(4,3))
ax = fig.add_subplot(111)
ax.plot(x, y, color='black')
ax.set_ylim(0, 1.1); ax.set_xlim(-2, 2)
plt.savefig('2023-01-19-1.png')

y = np.exp(-np.absolute(x))

fig = plt.figure(figsize=(4,3))
ax = fig.add_subplot(111)
ax.plot(x, y, color='black')
ax.set_ylim(0, 1.1); ax.set_xlim(-2, 2)
plt.savefig('2023-01-19-2.png')
