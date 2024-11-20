from scipy.stats import binom

# Parameter
n = 39
p = 0.25

# Wahrscheinlichkeit berechnen: P(5 <= X <= 15)
prob = binom.cdf(15, n, p) - binom.cdf(4, n, p)
print(prob)