#!/usr/bin/env python2
# -*- coding: utf-8 -*-
"""
Created on Mon Apr  1 19:30:25 2019

@author: snytav
"""

import numpy as np
from sklearn.decomposition import PCA
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.preprocessing import scale
data=pd.read_csv('ex.csv')
X = data.values
X=scale(X)
pca=PCA(n_components=44)
pca.fit(X)
var=pca.explained_variance_ratio_
var1=np.cumsum(np.round(pca.explained_variance_ratio_,decimals=4)*100)
print var1